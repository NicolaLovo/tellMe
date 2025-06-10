<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import router from '@/router'
import { useUserStore } from '@/stores/useUserStore'
import { SurveyAnswer } from '@/types/survey/answer/SurveyAnswer'
import { SurveyQuestionAnswer } from '@/types/survey/answer/SurveyQuestionAnswer'
import type { Survey } from '@/types/survey/Survey'
import { Button } from 'primevue'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps<{ survey: Survey }>()

const answers = ref<Record<string, string>>({})
const submitting = ref(false)
const submissionSuccess = ref(false)
const submissionError = ref('')

const toast = useToast()

function selectOption(questionId: string, optionId: string) {
  answers.value[questionId] = optionId
}

function isSelected(questionId: string, optionId: string) {
  return answers.value[questionId] === optionId
}

const allAnswered = computed(() => {
  return props.survey?.questions?.length
    ? props.survey.questions.every((q) => answers.value[q.id])
    : false
})

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

async function submit() {
  submitting.value = true
  submissionSuccess.value = false
  submissionError.value = ''

  const token = userStore.user?.token
  const uid = userStore.user?.uid

  if (!token || !uid) {
    submissionError.value = 'Utente non autenticato.'
    submitting.value = false
    return
  }

  const answersArray: SurveyQuestionAnswer[] = Object.entries(answers.value).map(
    ([questionId, optionId]) => ({
      questionId,
      optionId,
      type: 'multiple-choice',
    }),
  )

  const payload: SurveyAnswer = {
    _id: {
      uid,
      surveyId: props.survey._id,
    },
    creationDate: new Date(),
    answers: answersArray,
  }

  try {
    const response = await apiClient.citizens.citizen.surveys.surveyanswer.create({
      uid,
      surveyId: props.survey._id,
      surveyAnswer: payload,
    })

    if (response.status === 'success') {
      toast.success('Risposte inviate con successo!')
      router.push(APP_ROUTES.citizen.home)
      return
    } else {
      submissionError.value = response.data?.message || 'Errore di invio'
    }
  } catch (err: any) {
    submissionError.value = err.response?.data?.data?.message || 'Errore di invio'
    console.error('Errore invio:', err)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="survey-viewer">
    <header class="app-header">
      <h1>{{ survey.title }}</h1>
    </header>

    <div v-for="question in survey.questions" :key="question.id" class="question">
      <h3>{{ question.question }}</h3>
      <div class="options">
        <button
          v-for="option in question.options"
          :key="option.id"
          :class="['option-btn', { selected: isSelected(question.id, option.id) }]"
          @click="selectOption(question.id, option.id)"
          :disabled="survey.status !== 'published' || submitting"
        >
          {{ option.text }}
        </button>
      </div>
    </div>

    <Button
      class="submit-btn"
      :disabled="!allAnswered || survey.status !== 'published' || submitting || submissionSuccess"
      @click="submit"
    >
      {{ submitting ? 'Invio...' : 'Invia risposte' }}
    </Button>

    <p v-if="submissionError" class="error-msg">{{ submissionError }}</p>
  </div>
</template>

<style scoped>
.survey-viewer {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
  color: #3a2f5a;
}

.app-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #d6c6f9;
  padding-bottom: 0.5rem;
}

.question {
  margin-bottom: 2rem;
}

.options {
  display: grid;
  gap: 0.5rem;
}

.option-btn {
  padding: 0.5rem;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
  font-size: 1rem;
}

.option-btn.selected {
  background: #6226e3;
  color: #fff;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  font-weight: 600;
  background: #6226e3;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.success-msg {
  margin-top: 1rem;
}

.error-msg {
  color: red;
  margin-top: 1rem;
}
</style>
