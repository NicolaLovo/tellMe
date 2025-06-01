<script setup lang="ts">
import TownCouncilSurveyResultTable from '@/components/surveys/display/TownCouncilSurveyResultTable.vue'
import SurveyCitizenView from '@/components/surveys/visualiseSurvey/SurveyCitizenView.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const surveyId = route.params.surveyId as string
</script>

<template>
  <div class="survey-results-page">
    <TownCouncilSurveyResultTable :surveyId="surveyId" />
  </div>
</template>