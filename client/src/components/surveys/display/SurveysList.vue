<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import type { Survey } from '@/types/survey/Survey'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import PublishSurveyButton from '../buttons/PublishSurveyButton.vue'

// PrimeVue components
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'

const pageIndex = ref(0)
const pageSize = ref(10)
const surveys = ref<Survey[]>([])
const totalSurveys = ref<number>(0)
const toast = useToast()

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

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

const onPageChange = (event: { page: number; rows: number }) => {
  pageIndex.value = event.page
  pageSize.value = event.rows
  fetchSurveys()
}

onMounted(fetchSurveys)
</script>

<template>
  <div class="survey-list-page">
    <h2>Lista dei sondaggi</h2>

    <DataTable
      :value="surveys"
      :paginator="true"
      :rows="pageSize"
      :totalRecords="totalSurveys"
      :lazy="true"
      :first="pageIndex * pageSize"
      @page="onPageChange"
      dataKey="_id"
      emptyMessage="Non ci sono sondaggi disponibili."
      class="survey-table"
    >
      <Column field="title" header="Titolo" />
      <Column
        field="status"
        header="Stato"
        :body="(survey) => survey.status"
        bodyClass="status-div"
      />
      <Column header="">
        <template #body="slotProps">
          <div class="action-buttons-wrapper">
            <PublishSurveyButton
              v-if="slotProps.data.status === 'created'"
              :surveyId="slotProps.data._id"
              @on-publish="fetchSurveys"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style>
.survey-list-page {
  background-color: #f0f0f0;
  min-height: 100vh;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

h2 {
  color: #5e4b8b;
  font-size: 2rem;
  text-align: left;
  margin-bottom: 1rem;
}

/* Style the status cell */
.status-div {
  background-color: #4f0adf;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  width: max-content;
  display: inline-block;
}

/* Optional: style DataTable */
.survey-table {
  background-color: #f5f3ff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Wrapper per pulsanti azioni, per spacing */
.action-buttons-wrapper {
  display: flex;
  gap: 12px; /* spazio tra i pulsanti */
  align-items: center;
}
</style>
