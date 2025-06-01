<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore'
import axios from 'axios'
import { computed, ref } from 'vue'

import Rating from 'primevue/rating'

const quiz = ref({
  _id: '123',
  title: 'Quiz di esempio',
  status: 'published',
  creationDate: '2025-05-31',
  questions: [
    { id: 'q1', question: 'Quanto ti piace il gelato?' },
    { id: 'q2', question: 'Quanto ti piace la pizza?' },
  ],
  rewardPoints: 50,
})

const answers = ref<Record<string, number>>({})
const submitting = ref(false)
const submissionSuccess = ref(false)
const submissionError = ref('')

function selectRating(questionId: string, rating: number) {
  answers.value[questionId] = rating
}

const allAnswered = computed(() => quiz.value.questions.every((q) => answers.value[q.id]))

const userStore = useUserStore()

async function submit() {
  const token = userStore.user?.token
  const uid = userStore.user?.uid

  if (!token || !uid) {
    alert('Utente non autenticato.')
    return
  }

  const answersArray = Object.entries(answers.value).map(([questionId, rating]) => ({
    questionId,
    rating,
  }))

  const payload = {
    quizAnswer: {
      _id: {
        uid,
        quizId: quiz.value._id,
      },
      answers: answersArray,
    },
  }

  submitting.value = true
  submissionError.value = ''
  submissionSuccess.value = false

  try {
    await axios.post(
      `http://localhost:4000/api/v1/citizens/${uid}/quizzes/${quiz.value._id}/answer`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    submissionSuccess.value = true
  } catch (err: any) {
    console.error('Errore invio:', err)
    submissionError.value = err.response?.data?.data?.message || 'Errore sconosciuto'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="quiz-viewer">
    <header class="app-header">
      <h1>{{ quiz.title }}</h1>
    </header>

    <div v-for="question in quiz.questions" :key="question.id" class="question">
      <h3>{{ question.question }}</h3>
      <Rating
        v-model="answers[question.id]"
        :disabled="quiz.status !== 'published' || submitting"
        :cancel="false"
        :stars="5"
        @change="(e) => selectRating(question.id, e.value)"
      />
    </div>

    <button
      class="submit-btn"
      :disabled="!allAnswered || quiz.status !== 'published' || submitting"
      @click="submit"
    >
      {{ submitting ? 'Invio...' : 'Invia Risposte' }}
    </button>

    <p v-if="submissionSuccess" class="success-msg">Quiz inviato con successo! 🎉</p>
    <p v-if="submissionError" class="error-msg">{{ submissionError }}</p>
  </div>
</template>

<style scoped>
.quiz-viewer {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
  color: #3a2f5a;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.app-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #d6c6f9;
  padding-bottom: 0.5rem;
  width: 100%;
}

.question {
  margin-bottom: 2rem;
  width: 100%;
}

.question h3 {
  margin-bottom: 1rem;
}

.question .p-rating {
  justify-content: center;
  display: flex;
}

.submit-btn {
  width: 100%;
  max-width: 300px;
  padding: 0.75rem;
  margin-top: 1rem;
  font-weight: 600;
  background: #6226e3;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  align-self: center;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.success-msg,
.error-msg {
  margin-top: 1rem;
  width: 100%;
  max-width: 300px;
  text-align: center;
}
.success-msg {
  color: green;
}
.error-msg {
  color: red;
}
</style>
