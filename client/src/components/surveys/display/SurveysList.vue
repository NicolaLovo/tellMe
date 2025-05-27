<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import type { Survey } from '@/types/survey/Survey'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import PublishSurveyButton from '../buttons/PublishSurveyButton.vue'

const pageIndex = ref(0)
const pageSize = ref(10)
const surveys = ref<Survey[]>([])
const totalSurveys = ref<number>(0)
const toast = useToast()

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

const nextPage = () => {
  pageIndex.value++
  fetchSurveys()
}

const prevPage = () => {
  pageIndex.value--
  fetchSurveys()
}

const fetchSurveys = async () => {
  try {
    const response = await apiClient.townCouncil.surveys.list({
      pageIndex: pageIndex.value.toString(),
      pageSize: pageSize.value.toString(),
    })

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
      <table v-if="surveys.length" class="survey-table">
        <thead>
          <tr>
            <th>Titolo</th>
            <th>Stato</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="survey in surveys">
            <td>{{ survey.title }}</td>
            <td>
              <div class="status-div">{{ survey.status }}</div>
            </td>
            <td>
              <PublishSurveyButton
                v-if="survey.status === 'created'"
                :surveyId="survey._id"
                @on-publish="fetchSurveys"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="totalSurveys > pageSize" class="pagination-controls">
        <button :disabled="pageIndex === 0" @click="prevPage">← Pagina precedente</button>

        <span> Pagina {{ pageIndex + 1 }} di {{ Math.ceil(totalSurveys / pageSize) }} </span>

        <button :disabled="(pageIndex + 1) * pageSize >= totalSurveys" @click="nextPage">
          Pagina successiva →
        </button>
      </div>

      <!-- Message when no surveys found -->
      <p v-else>Non ci sono sondaggi disponibili.</p>
    </div>
  </div>
</template>

<style>
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.pagination-controls button {
  background-color: #4f0adf;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

h2 {
  color: #5e4b8b;
  font-size: 2rem;
  text-align: left;
  padding-left: 20px;
}

thead {
  color: #ffffff;
}

.survey-list-page {
  background-color: #f0f0f0;
  min-height: 100vh;
  padding-top: 20px;
}

.survey-list {
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.survey-table {
  width: 100%;
  background-color: #f5f3ff;
  /* border-radius: 12px; */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.survey-table th {
  border: 1px solid #5e4b8b;
  padding: 8px;
  text-align: left;
  font-size: 1.2rem;
  background-color: #4f0adf;
}

.survey-table td {
  border: 1px solid #5e4b8b;
  padding: 8px;
  text-align: left;
}

.survey-creation-page {
  background-color: #f0f0f0;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  padding: 20px; /* Padding per un po' di respiro ai bordi */
}

.status-div {
  background-color: #4f0adf;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1rem;
  width: min-content;
}
</style>
