<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import type { Survey } from '@/types/survey/Survey'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import SurveyListRow from './CitizenSurveyListRow.vue'

const pageIndex = ref(0)
const pageSize = ref(10)
const surveys = ref<Survey[]>([])
const totalSurveys = ref<number>(0)
const toast = useToast()

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

const fetchSurveys = async () => {
  try {
    const response = await apiClient.citizenApiClient.surveys.list(
      {
        pageIndex: pageIndex.value.toString(),
        pageSize: pageSize.value.toString(),
      },
      { citizenId: userStore.user?.uid as string },
    )

    if (response.status === 'success') {
      surveys.value = response.data.surveys
      totalSurveys.value = response.data.metadata.totalCount
    } else {
      console.error('Errore nel caricamento dei sondaggi.')
    }
  } catch (err) {
    console.error('Errore durante il caricamento dei sondaggi:', err)
  }
}

onMounted(fetchSurveys)
</script>

<template>
  <div class="survey-list-page">
    <h2>Lista dei sondaggi</h2>
    <div class="survey-list">
      <Card>
        <template #title>
          <h3>Sondaggi disponibili</h3>
        </template>
        <template #content>
          <table v-if="surveys.length">
            <tr>
              <th>Titolo</th>
              <th>Stato</th>
              <th></th>
            </tr>
            <tr v-for="survey in surveys">
              <SurveyListRow :survey="survey" />
            </tr>
          </table>
          <!-- Message when no surveys found -->
          <p v-else>Non ci sono sondaggi disponibili.</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<style>

</style>
