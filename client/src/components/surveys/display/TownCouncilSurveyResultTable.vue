<script setup lang="ts">
import type { SurveyResult } from '@/types/survey/SuveyResult'
import { onMounted, reactive } from 'vue'

import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import ProgressBar from 'primevue/progressbar'

// Define the props for the component, which includes the survey ID
const props = defineProps<{
  surveyId: string
}>()

// Define the survey result data structure
const surveyResults = reactive<SurveyResult>({
  surveyId: 'rtnwrn',
  surveyTitle: 'Titolo del sondaggio',
  results: [
    {
      questionId: 'aaaaaaaa',
      questionText: 'Domanda 1',
      options: [
        {
          optionId: 'opzione1',
          votes: 5,
          optionText: 'a',
        },
        {
          optionId: 'opzione2',
          votes: 9,
          optionText: 'b',
        },
      ],
    },
  ],
})

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

// Function to fetch survey results
const fetchSurveyResults = async () => {
  try {
    const response = await apiClient.townCouncil.surveys.survey.surveyresults.read({
      surveyId: props.surveyId,
    })
    if (response.status === 'success') {
      surveyResults.surveyId = response.data.surveyResults.surveyId
      surveyResults.surveyTitle = response.data.surveyResults.surveyTitle
      surveyResults.results = response.data.surveyResults.results
      console.log('Risultati del sondaggio caricati con successo:', surveyResults)
    } else {
      console.error('Errore nel caricamento delle risposte.')
    }
  } catch (err) {
    console.error('Errore durante il caricamento delle risposte:', err)
  }
}

// Function to calculate the percentage of votes for each option
function calculatePercentage(votes: number, options: { optionId: string; votes: number }[]) {
  const total = options.reduce((acc, opt) => acc + opt.votes, 0)
  return total > 0 ? Math.round((votes / total) * 100) : 0
}

// Function to get total number of responses (based on first question's total votes, since all questions should have the same number of responses)
function getTotalResponses(): number {
  if (surveyResults.results.length === 0) return 0
  return surveyResults.results[0].options.reduce((sum, opt) => sum + opt.votes, 0)
}

// Fetch survey results when the component is mounted
onMounted(fetchSurveyResults)
</script>

<template>
  <div class="p-4">
    <h1 class="title-h1">
      Risultati del sondaggio "{{ surveyResults.surveyTitle }}"
    </h1>

    <div v-if="surveyResults && surveyResults.results" class="users-div">
      <Tag v-if="getTotalResponses() > 1" class="users-tag">{{ getTotalResponses() }} utenti hanno risposto al sondaggio</Tag>
      <Tag  v-if="getTotalResponses() == 1" class="users-tag">1 utente ha risposto al sondaggio</Tag>
      <Tag v-if="getTotalResponses() == 0" class="users-tag">Nessun utente ha risposto al sondaggio</Tag>
    </div>

    <!-- <div>
      <div
        v-for="(question, qIndex) in surveyResults.results"
        :key="question.questionId"
        class="mb-6"
      >
        <Card class="mb-3">
          <template #title> Domanda {{ qIndex + 1 }}: {{ question.questionText }} </template>
          <template #content>
            <div v-for="option in question.options" :key="option.optionId" class="mb-2">
              <div class="option-div">
                <span>{{ option.optionText }}</span>
                <span>Voti:{{ option.votes }}</span>
              </div>
              <ProgressBar :value="calculatePercentage(option.votes, question.options)" />
            </div>
          </template>
        </Card>
      </div>
    </div> -->
    <div
      v-for="(question, qIndex) in surveyResults.results"
      :key="question.questionId"
      class="survey-result-div"
    >
      <h3 class="question-h3">Domanda {{ qIndex + 1 }}: {{ question.questionText }}</h3>
      <div v-for="option in question.options" :key="option.optionId">
        <div class="option-div">
          <span>{{ option.optionText }}</span>
          <span style="color: #1a237e;" >Voti: {{ option.votes }}</span>
        </div>
        <ProgressBar :value="calculatePercentage(option.votes, question.options)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-h1{
  margin: 1rem;
}

.question-h3{
  margin: 0;
  padding-bottom: 1rem;
}

.users-div {
  padding-left: 1rem;
}

.users-tag {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  background-color: #5c6bc0;
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
  background-color: rgba(255, 255, 255, 0.600);
}
</style>
