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
    const response = await apiClient.citizen.surveys.list(
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
            <thead>
              <tr>
                <th>Titolo</th>
                <th>Stato</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <SurveyListRow v-for="survey in surveys" :key="survey._id" :survey="survey" />
            </tbody>
          </table>
          <p v-else>Non ci sono sondaggi disponibili.</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<style></style>
