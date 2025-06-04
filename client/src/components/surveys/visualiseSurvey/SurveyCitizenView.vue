<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES';
import router from '@/router';
import { useUserStore } from '@/stores/useUserStore'
import type { Survey } from '@/types/survey/Survey'
import axios from 'axios'
import { computed, ref } from 'vue'

const props = defineProps<{ survey: Survey }>()

const answers = ref<Record<string, string>>({})
const submitting = ref(false)
const submissionSuccess = ref(false)
const submissionError = ref('')

const goHome = () => {
  router.push(APP_ROUTES.home)
}

function selectOption(questionId: string, optionId: string) {
  answers.value[questionId] = optionId
}

function isSelected(questionId: string, optionId: string) {
  return answers.value[questionId] === optionId
}

const allAnswered = computed(() => props.survey.questions.every((q) => answers.value[q.id]))

const userStore = useUserStore()

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

  const answersArray = Object.entries(answers.value).map(([questionId, optionId]) => {
    const question = props.survey.questions.find((q) => q.id === questionId)
    return {
      questionId,
      optionId,
      type: question?.type || 'unknown',
    }
  })

  const payload = {
    surveyAnswer: {
      _id: {
        uid,
        surveyId: props.survey._id,
      },
      answers: answersArray,
    },
  }

  try {
    await axios.post(
      `http://localhost:4000/api/v1/citizens/${uid}/surveys/${props.survey._id}/answer`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    submissionSuccess.value = true
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

    <button
      class="submit-btn"
      :disabled="!allAnswered || survey.status !== 'published' || submitting || submissionSuccess"
      @click="submit"
    >
      {{ submitting ? 'Invio...' : 'Invia risposte' }}
    </button>

    <h3 v-if="submissionSuccess" class="success-msg">Sondaggio inviato con successo! 🎉</h3>
    <Button v-if="submissionSuccess" @click="goHome" label="Torna alla Home"/>
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
