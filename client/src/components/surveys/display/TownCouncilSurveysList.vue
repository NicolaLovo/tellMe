<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import type { Survey } from '@/types/survey/Survey'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { formatDateWithMomentHs } from '../../../tools/formatDateWithMoment'
import PublishSurveyButton from '../buttons/PublishSurveyButton.vue'

// PrimeVue components
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import CloseSurveyButton from '../buttons/CloseSurveyButton.vue'
import GetSurveyResultsButton from '../buttons/GetSurveyResultsButton.vue'

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
  <Card>
    <template #title> Lista dei sondaggi </template>
    <template #content>
      <div>
        <DataTable
          v-if="totalSurveys > 0"
          :value="surveys"
          :paginator="true"
          :rows="pageSize"
          :totalRecords="totalSurveys"
          :first="pageIndex * pageSize"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          :lazy="true"
          @page="onPageChange"
          responsiveLayout="scroll"
        >
          <Column header="Titolo">
            <template #body="slotProps">
              <div style="align-items: center">
                {{ slotProps.data.title }}
              </div>
            </template>
          </Column>
          <Column header="Data di creazione">
            <template #body="slotProps">
              <div style="align-items: center">
                {{ formatDateWithMomentHs(slotProps.data.creationDate) }}
              </div>
            </template>
          </Column>
          <Column header="Stato">
            <template #body="slotProps">
              <div style="align-items: center">
                <Tag>{{ slotProps.data.status }}</Tag>
              </div>
            </template>
          </Column>
          <Column header="">
            <template #body="slotProps">
              <div style="align-items: center">
                <PublishSurveyButton
                  v-if="slotProps.data.status === 'created'"
                  :surveyId="slotProps.data._id"
                  @on-publish="fetchSurveys"
                />
                <CloseSurveyButton
                  v-if="slotProps.data.status === 'published'"
                  :surveyId="slotProps.data._id"
                  @on-close="fetchSurveys"
                />
                <GetSurveyResultsButton
                  v-if="slotProps.data.status === 'closed'"
                  :surveyId="slotProps.data._id"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <!-- Message when no surveys found -->
        <p v-else>Non ci sono sondaggi disponibili.</p>
      </div>
    </template>
  </Card>
</template>

<style></style>
