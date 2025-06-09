<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'
import { QuizAnswer } from '@/types/quiz/answer/QuizAnswer'
import { QuizQuestionAnswer } from '@/types/quiz/answer/QuizQuestionAnswer'
import Rating from 'primevue/rating'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()

const agencyId = route.params.agencyId as string
const quizId = route.params.quizId as string
const quizAnswerId = route.params.answerId as string

const quiz = ref<any>(null)
const answers = ref<Record<string, number | undefined>>({})
const submitting = ref(false)
const submissionSuccess = ref(false)
const submissionError = ref('')

const toast = useToast()

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore.user?.token ?? '' })

async function loadQuiz() {
  try {
    const response = await apiClient.agencies.agency.quizzes.quiz.read({
      agencyId,
      quizId,
    })

    if (response.status === 'success') {
      const initialAnswers: Record<string, number | undefined> = {}
      for (const question of response.data.quiz.questions) {
        initialAnswers[question.id] = undefined
      }
      answers.value = initialAnswers
      quiz.value = response.data.quiz
    } else {
      submissionError.value = 'Errore caricamento quiz'
    }
  } catch (error) {
    submissionError.value = 'Errore caricamento quiz'
  }
}

const allAnswered = computed(() =>
  quiz.value
    ? quiz.value.questions.every((q: any) => typeof answers.value[q.id] === 'number')
    : false,
)

async function submit() {
  const token = userStore.user?.token
  const uid = userStore.user?.uid

  if (!token || !uid) {
    submissionError.value = 'Utente non autenticato.'
    return
  }

  if (!quiz.value) {
    submissionError.value = 'Quiz non caricato.'
    return
  }

  if (!quizAnswerId) {
    submissionError.value = 'ID risposta non trovato. Impossibile aggiornare.'
    return
  }

  const answersArray: QuizQuestionAnswer[] = Object.entries(answers.value)
    .filter(([_, rating]) => typeof rating === 'number' && rating >= 1 && rating <= 5)
    .map(([questionId, rating]) => ({
      questionId,
      optionId: String(rating) as '1' | '2' | '3' | '4' | '5',
      type: 'rating' as const,
    }))

  const payload: { quizAnswer: Partial<QuizAnswer> } = {
    quizAnswer: {
      status: 'completed',
      answers: answersArray,
    },
  }

  submitting.value = true
  submissionError.value = ''
  submissionSuccess.value = false

  try {
    const response = await apiClient.agencies.agency.quizzes.quiz.answers.update(
      {
        agencyId,
        quizId,
        quizAnswerId,
      },
      payload,
    )

    if (response.status !== 'success') {
      throw new Error(response.data.message || 'Errore aggiornamento risposta')
    }

    toast.success('Risposte inviate con successo!')
    router.push(APP_ROUTES.citizen.home)
  } catch (err: any) {
    console.error('Errore invio:', err)
    submissionError.value = err.message || 'Errore sconosciuto'
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadQuiz()
})
</script>

<template>
  <div class="quiz-viewer" v-if="quiz && Object.keys(answers).length > 0">
    <header class="app-header">
      <h1>{{ quiz.title }}</h1>
    </header>

    <div v-for="question in quiz.questions" :key="question.id" class="question">
      <h3>{{ question.question }}</h3>
      <Rating v-model="answers[question.id]" :cancel="false" :stars="5" :disabled="submitting" />
    </div>
    <div class="submit-div">
      <Button
        class="submit-btn"
        :disabled="!allAnswered || submitting || submissionSuccess"
        @click="submit"
      >
        {{ submitting ? 'Invio...' : 'Invia risposte' }}
      </Button>
    </div>

    <p v-if="submissionError" class="error-msg">{{ submissionError }}</p>
  </div>

  <div v-else>
    <p>Caricamento quiz...</p>
    <p v-if="submissionError" class="error-msg">{{ submissionError }}</p>
  </div>
</template>

<style scoped>
.quiz-viewer {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
}

.app-header {
  margin-bottom: 2rem;
  text-align: center;
}

.question {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.submit-btn {
  padding: 0.8rem 1.6rem;
  border-radius: 5px;
  margin-top: 1rem;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-msg {
  color: green;
  margin-top: 1rem;
}

.error-msg {
  color: red;
  margin-top: 1rem;
}

.submit-div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
