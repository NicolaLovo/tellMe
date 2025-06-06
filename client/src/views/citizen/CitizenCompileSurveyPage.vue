<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import SurveyCitizenView from '@/components/surveys/visualiseSurvey/SurveyCitizenView.vue'
import { useUserStore } from '@/stores/useUserStore'
import { Survey } from '@/types/survey/Survey'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const surveyId = route.params.surveyId as string

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

const survey = ref<Survey | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await apiClient.townCouncil.surveys.survey.read({ surveyId })

    if (response.status === 'success' && !('message' in response.data)) {
      survey.value = response.data.survey
    } else {
      error.value = 'Errore durante il caricamento del sondaggio.'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Errore durante il caricamento del sondaggio.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="citizen-compile-survey-page">
    <div class="header">
      <h2>Compila sondaggio</h2>
    </div>

    <div class="content">
      <p v-if="loading" class="p-text-secondary">Caricamento...</p>
      <p v-else-if="error" class="p-text-danger">{{ error }}</p>
      <SurveyCitizenView v-if="!loading && !error && survey" :survey="survey!" />
    </div>
  </div>
</template>

<style scoped>
.citizen-compile-survey-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.content {
  max-width: 800px;
  width: 100%;
  text-align: center;
}
</style>
