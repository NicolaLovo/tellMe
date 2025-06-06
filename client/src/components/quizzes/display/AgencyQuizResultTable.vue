<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import ProgressBar from 'primevue/progressbar'
import { QuizResults } from '@/types/quiz/QuizResults'

// Define the props for the component, which includes the survey ID
const props = defineProps<{
  quizAnswerId: string
}>()

// Define the survey result data structure
const quizResults = reactive<QuizResults>({
  quizId: 'string',
  agencyId: 'string',
  title: 'string',
  results: [{
    questionId: 'string',
    question: 'string',
    type: 'rating',
    options: [{
      optionId: '1',
      votes: 5,
    }]
  }]
})

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

// Function to fetch survey results
const fetchSurveyResults = async () => {
  try {
    const response = await apiClient...({
      quizAnswerId: props.quizAnswerId,
    })
    if (response.status === 'success') {
      quizResults.results = response.data.quizResults.results
      console.log('Risultati del questionario caricati con successo:', quizResults)
    } else {
      console.error('Errore nel caricamento dei risultati.')
    }
  } catch (err) {
    console.error('Errore durante il caricamento dei risultati:', err)
  }
}

// Function to calculate the percentage of votes for each option
function calculatePercentage(votes: number, options: { optionId: string; votes: number }[]) {
  const total = options.reduce((acc, opt) => acc + opt.votes, 0)
  return total > 0 ? Math.round((votes / total) * 100) : 0
}

// Function to get total number of responses (based on first question's total votes, since all questions should have the same number of responses)
function getTotalResponses(): number {
  if (quizResults.results.length === 0) return 0
  return quizResults.results[0].options.reduce((sum, opt) => sum + opt.votes, 0)
}

// Fetch survey results when the component is mounted
onMounted(fetchSurveyResults)
</script>

<template>
  <div class="p-4">
    <h1 class="title-h1">Risultati del sondaggio "{{ quizResults.title }}"</h1>

    <div v-if="quizResults && quizResults.results" class="users-div">
      <Tag class="users-tag">{{ getTotalResponses() }} utenti hanno risposto al sondaggio</Tag>
    </div>
    <div
      v-for="(question, qIndex) in quizResults.results"
      :key="question.questionId"
      class="quiz-result-div"
    >
      <h3 class="question-h3">Domanda {{ qIndex + 1 }}: {{ question }}</h3>
      <div v-for="option in question.options" :key="option.optionId">
        <div class="option-div">
          <span>{{ option.optionId }}</span>
          <span>Voti: {{ option.votes }}</span>
        </div>
        <ProgressBar :value="calculatePercentage(option.votes, question.options)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-h1 {
  margin: 1rem;
}

.question-h3 {
  margin: 0;
  padding-bottom: 1rem;
}

.users-div {
  padding-left: 1rem;
}

.users-tag {
  font-size: 1.2rem;
  font-weight: bold;
}

.option-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-top: 0.8rem;
}

.survey-result-div {
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
  margin: 1rem;
}
</style>
