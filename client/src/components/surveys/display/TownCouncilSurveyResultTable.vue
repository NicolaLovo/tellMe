<script setup lang="ts">
import type { SurveyResult } from '@/types/survey/SuveyResult'
import { onMounted, reactive } from 'vue'

import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import Card from 'primevue/card'
import ProgressBar from 'primevue/progressbar'

// Define the props for the component, which includes the survey ID
const props = defineProps<{
  surveyId: string
}>()

// Define the survey result data structure
const surveyResults = reactive<SurveyResult>({
  surveyId: 'rtnwrn',
  results: [
    {
      questionId: 'aaaaaaaa',
      options: [
        {
          optionId: 'bbbbb',
          votes: 5,
        },
        {
          optionId: 'cccccc',
          votes: 9,
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

// Fetch survey results when the component is mounted
onMounted(fetchSurveyResults)
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Risultati del sondaggio</h2>
    <Card class="mb-4">
      <template #title> Sondaggio</template>
      <template #content>
        <div v-if="surveyResults && surveyResults.results">
          <p>Numero di domande con risposta: {{ surveyResults.results.length }}</p>
        </div>
      </template>
    </Card>

    <div>
      <div
        v-for="(question, qIndex) in surveyResults.results"
        :key="question.questionId"
        class="mb-6"
      >
        <Card class="mb-3">
          <template #title> Domanda {{ qIndex + 1 }} </template>
          <template #content>
            <div v-for="option in question.options" :key="option.optionId" class="mb-2">
              <div class="option-div">
                <span>Opzione:{{ option.optionId }}</span>
                <span>Voti:{{ option.votes }}</span>
              </div>
              <ProgressBar :value="calculatePercentage(option.votes, question.options)" />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.option-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
</style>
