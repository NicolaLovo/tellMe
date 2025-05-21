<script setup>
import { computed, reactive } from 'vue'

const survey = reactive({
  title: 'Customer Satisfaction Survey',
  status: 'published',
  questions: [
    {
      id: 'q1',
      question: 'How satisfied are you with our product?',
      type: 'multiple-choice',
      options: [
        { id: 'o1', text: 'Very satisfied' },
        { id: 'o2', text: 'Satisfied' },
        { id: 'o3', text: 'Neutral' },
        { id: 'o4', text: 'Dissatisfied' },
        { id: 'o5', text: 'Very dissatisfied' },
      ],
    },
    {
      id: 'q2',
      question: 'Would you recommend our product to others?',
      type: 'multiple-choice',
      options: [
        { id: 'o1', text: 'Yes' },
        { id: 'o2', text: 'No' },
      ],
    },
  ],
})

const answers = reactive({})

function selectOption(questionId, optionId) {
  answers[questionId] = optionId
}

function isSelected(questionId, optionId) {
  return answers[questionId] === optionId
}

const allAnswered = computed(() => {
  return survey.questions.every((q) => answers[q.id])
})

function submit() {
  if (!allAnswered.value) {
    alert('Per favore rispondi a tutte le domande!')
    return
  }
  console.log('Risposte inviate:', JSON.stringify(answers, null, 2))
  alert('Grazie per aver completato il sondaggio!')
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
          :class="['btn', { selected: isSelected(question.id, option.id) }]"
          @click="selectOption(question.id, option.id)"
          :disabled="survey.status !== 'published'"
          type="button"
        >
          {{ option.text }}
        </button>
      </div>
    </div>

    <button
      class="btn submit-btn"
      :disabled="!allAnswered || survey.status !== 'published'"
      @click="submit"
      type="button"
    >
      Invia risposte
    </button>
  </div>
</template>

<style scoped>
.btn {
  padding: 12px 25px;
  background-color: #9578f4;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  width: 100%;
  margin-bottom: 0.6rem;
}

.btn:hover {
  background-color: #815aff;
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
}

.btn.selected {
  background-color: #815aff !important;
  font-weight: 700;
  transform: scale(1.05);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}

.survey-viewer {
  max-width: 600px;
  margin: 2rem auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 0 1rem;
  color: #3a2f5a;
}

.app-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #d6c6f9;
  padding-bottom: 0.5rem;
}

.app-header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.question {
  margin-bottom: 2rem;
}

.question h3 {
  margin-bottom: 1rem;
  color: #6226e3;
  font-weight: 600;
}

.options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.6rem;
}

.submit-btn {
  margin-top: 1rem;
  width: 100%;
  font-weight: 700;
}
</style>
