<script lang="ts" setup>
import type { SurveyResult } from '@/types/survey/SuveyResult'
import { onMounted, ref } from 'vue'

import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import Card from 'primevue/card'
import ProgressBar from 'primevue/progressbar'

// Define the props for the component, which includes the survey ID
const props = defineProps<{
  surveyId: string
}>()

// Define the survey result data structure, which includes the survey ID and an array of results
const surveyResult = ref<SurveyResult>({
  surveyId: '',
  results: [],
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
      surveyResult.value = response.data
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
    <h2 class="text-2xl font-bold mb-4">Survey Results</h2>
    <div>
      <div
        v-for="(question, qIndex) in surveyResult.results"
        :key="question.questionId"
        class="mb-6"
      >
        <Card class="mb-3">
          <template #title> Question {{ qIndex + 1 }} </template>
          <template #content>
            <div v-for="option in question.options" :key="option.optionId" class="mb-2">
              <div class="flex justify-between">
                <span>Option {{ option.optionId }}</span>
                <span>{{ option.votes }} votes</span>
              </div>
              <ProgressBar :value="calculatePercentage(option.votes, question.options)" />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
