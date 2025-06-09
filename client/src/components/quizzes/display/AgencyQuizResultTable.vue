<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import { QuizResults } from '@/types/quiz/QuizResults'
import ProgressBar from 'primevue/progressbar'
import { onMounted, reactive } from 'vue'

// Define the props for the component, which includes the survey ID
const props = defineProps<{
  agencyId: string
  quizId: string
}>()

// Define the survey result data structure
const quizResults = reactive<QuizResults>({
  quizId: 'string',
  agencyId: 'string',
  title: 'string',
  results: [
    {
      questionId: 'string',
      question: 'string',
      type: 'rating',
      options: [
        {
          optionId: '1',
          votes: 5,
        },
      ],
    },
  ],
})

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

// Function to fetch quiz results
const fetchQuizResults = async () => {
  try {
    const response = await apiClient.agencies.agency.quizzes.quiz.results.read({
      agencyId: props.agencyId,
      quizId: props.quizId,
    })
    if (response.status === 'success') {
      quizResults.quizId = response.data.quizResults.quizId
      quizResults.agencyId = response.data.quizResults.agencyId
      quizResults.title = response.data.quizResults.title
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

function renderStars(count: number): string {
  return '★'.repeat(count) + '☆'.repeat(5 - count)
}

// Fetch quiz results when the component is mounted
onMounted(fetchQuizResults)
</script>

<template>
  <div class="p-4">
    <h1 class="title-h1">Risultati del questionario "{{ quizResults.title }}"</h1>

    <div v-if="quizResults && quizResults.results" class="users-div">
      <Tag v-if="getTotalResponses() > 1" class="users-tag"
        >{{ getTotalResponses() }} utenti hanno risposto al questionario</Tag
      >
      <Tag v-if="getTotalResponses() == 1" class="users-tag"
        >1 utente ha risposto al questionario</Tag
      >
      <Tag v-if="getTotalResponses() == 0" class="users-tag"
        >Nessun utente ha risposto al questionario</Tag
      >
    </div>
    <div
      v-for="(question, qIndex) in quizResults.results"
      :key="question.questionId"
      class="quiz-result-div"
    >
      <h3 class="question-h3">Domanda {{ qIndex + 1 }}: {{ question.question }}</h3>
      <div v-for="option in question.options" :key="option.optionId">
        <div class="option-div">
          <Tag class="star-tag">
            <span v-html="renderStars(parseInt(option.optionId))"></span>
          </Tag>
          <span>Voti: {{ option.votes }}</span>
        </div>
        <ProgressBar :value="calculatePercentage(option.votes, question.options)" />
      </div>
      <div class="average-div">
        <Tag class="average-tag"
          >Media voti:
          {{
            (
              question.options.reduce((acc, opt) => acc + parseInt(opt.optionId) * opt.votes, 0) /
              question.options.reduce((acc, opt) => acc + opt.votes, 0)
            ).toFixed(1)
          }}
          ★</Tag
        >
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
  font-size: 1.1rem;
  margin-bottom: 1rem;
  background-color: #5c6bc0;
}

.option-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-top: 0.8rem;
}

.quiz-result-div {
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
  margin: 1rem;
  background-color: rgba(255, 255, 255, 0.6);
}

.star-tag {
  background-color: #5c6bc0;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.average-div {
  margin-top: 1rem;
  font-size: 1.1rem;
}

.average-tag {
  background-color: #5c6bc0;
  margin-top: 10px;
}
</style>
