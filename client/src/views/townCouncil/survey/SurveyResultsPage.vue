<script setup lang="ts">
import TownCouncilSurveyResultTable from '@/components/surveys/display/TownCouncilSurveyResultTable.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const surveyId = route.params.surveyId as string
</script>

<template>
  <div class="survey-results-page">
    <TownCouncilSurveyResultTable :surveyId="surveyId" />
  </div>
</template>
