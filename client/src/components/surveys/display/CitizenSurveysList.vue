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
    <div class="survey-list">
      <Card>
        <template #title>
          <h3>Sondaggi disponibili</h3>
        </template>
        <template #content>
          <table v-if="surveys.length" class="styled-table">
            <thead>
              <tr>
                <th>Titolo</th>
                <th>Stato</th>
                <th>Compila</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="survey in surveys" :key="survey._id">
                <SurveyListRow :survey="survey" />
              </tr>
            </tbody>
          </table>
          <p v-else>Non ci sono sondaggi disponibili.</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.styled-table th,
.styled-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.styled-table thead {
  background-color: #f9f9f9;
}

.styled-table tr:nth-child(even) {
  background-color: #f6f6f6;
}

.styled-table tr:hover {
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}
</style>
