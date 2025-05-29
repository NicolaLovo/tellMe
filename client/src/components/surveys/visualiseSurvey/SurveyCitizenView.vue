<script setup lang="ts">
import axios from 'axios'
import { computed, ref } from 'vue'

const props = defineProps<{
  survey: {
    _id: string
    title: string
    status: string
    creationDate: string
    questions: {
      id: string
      question: string
      type: string
      options: { id: string; text: string }[]
    }[]
    rewardPoints: number
  }
}>()

const answers = ref<Record<string, string>>({})
const submitting = ref(false)
const submissionSuccess = ref(false)
const submissionError = ref('')

// 👇 Cambia con l'UID dell'utente loggato
const uid = 'current-citizen-id' // TODO: Ottieni da auth o store

function selectOption(questionId: string, optionId: string) {
  answers.value[questionId] = optionId
}

function isSelected(questionId: string, optionId: string) {
  return answers.value[questionId] === optionId
}

const allAnswered = computed(() => props.survey.questions.every((q) => answers.value[q.id]))

async function submit() {
  if (!allAnswered.value) {
    alert('Per favore rispondi a tutte le domande!')
    return
  }

  submitting.value = true
  submissionError.value = ''

  try {
    await axios.post(
      `http://localhost:4000/api/v1/citizens/${uid}/surveys/${props.survey._id}/answer`,
      { answers: answers.value },
    )
    submissionSuccess.value = true
  } catch (err) {
    console.error(err)
    submissionError.value = "Errore durante l'invio delle risposte."
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="survey-viewer">
    <header class="app-header">
      <h1>{{ survey.title }}</h1>
      <p>Status: {{ survey.status }}</p>
      <p>Creato il: {{ new Date(survey.creationDate).toLocaleString() }}</p>
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
      :disabled="!allAnswered || survey.status !== 'published' || submitting"
      @click="submit"
    >
      {{ submitting ? 'Invio...' : 'Invia Risposte' }}
    </button>

    <p v-if="submissionSuccess" class="success-msg">Sondaggio inviato con successo! 🎉</p>
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
  color: green;
  margin-top: 1rem;
}

.error-msg {
  color: red;
  margin-top: 1rem;
}
</style>
