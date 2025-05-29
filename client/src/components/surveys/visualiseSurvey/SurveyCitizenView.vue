<!-- <script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const survey = ref(null)
const answers = ref({})

function selectOption(questionId, optionId) {
  answers.value[questionId] = optionId
}

function isSelected(questionId, optionId) {
  return answers.value[questionId] === optionId
}

const allAnswered = computed(() => {
  return survey.value?.questions.every((q) => answers.value[q.id])
})

function submit() {
  if (!allAnswered.value) {
    alert('Per favore rispondi a tutte le domande!')
    return
  }
  console.log('Risposte inviate:', JSON.stringify(answers.value, null, 2))
  alert('Grazie per aver completato il sondaggio!')
}

onMounted(() => {
  survey.value = {
    id: 1,
    title: 'Sondaggio di esempio',
    status: 'published',
    questions: [
      {
        id: 'q1',
        question: 'Qual è il tuo colore preferito?',
        options: [
          { id: 'o1', text: 'Rosso' },
          { id: 'o2', text: 'Blu' },
          { id: 'o3', text: 'Verde' },
        ],
      },
      {
        id: 'q2',
        question: 'Qual è il tuo animale preferito?',
        options: [
          { id: 'o1', text: 'Cane' },
          { id: 'o2', text: 'Gatto' },
          { id: 'o3', text: 'Uccello' },
        ],
      },
    ],
  }
})
</script>
<template>
  <div class="survey-viewer" v-if="survey">
    <header class="app-header">
      <h1>{{ survey.title }}</h1>
    </header>

    <div v-for="question in survey.questions" :key="question.id" class="question">
      <h3>{{ question.question }}</h3>
      <div class="options">
        <Button
          v-for="option in question.options"
          :key="option.id"
          :label="option.text"
          :class="{
            'p-button-outlined': !isSelected(question.id, option.id),
            'p-button-primary': isSelected(question.id, option.id),
          }"
          @click="selectOption(question.id, option.id)"
          :disabled="survey.status !== 'published'"
        />
      </div>
    </div>

    <Button
      label="Invia risposte"
      class="submit-btn"
      :disabled="!allAnswered || survey.status !== 'published'"
      @click="submit"
    />
  </div>

  <div v-else>
    <p>Caricamento sondaggio...</p>
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
</style> -->

<template></template>
