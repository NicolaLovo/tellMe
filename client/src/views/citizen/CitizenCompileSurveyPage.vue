<script setup lang="ts">
import SurveyCitizenView from '@/components/surveys/visualiseSurvey/SurveyCitizenView.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const surveyId = route.params.surveyId as string

const survey = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/surveys/${surveyId}`)
    survey.value = response.data.data.survey
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="citizen-compile-survey-page">
    <h2>Compila Sondaggio</h2>

    <div v-if="loading">Caricamento...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="survey">
      <SurveyCitizenView :survey="survey" />
    </div>
  </div>
</template>
