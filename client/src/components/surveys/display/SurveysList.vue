<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import type { Survey } from '@/types/survey/Survey'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import PublishSurveyButton from '../buttons/PublishSurveyButton.vue'

const surveys = ref<Survey[]>([])
const totalSurveys = ref<number>(0)
const toast = useToast()

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

const fetchSurveys = async () => {
  try {
    const response = await apiClient.townCouncil.surveys.list({})

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
  <Card>
    <template #title> Lista dei sondaggi </template>
    <template #content>
      <div>
        <DataTable v-if="surveys.length" :value="surveys" responsiveLayout="scroll">
          <Column field="title" header="Titolo"></Column>
          <Column header="Stato">
            <template #body="slotProps">
              <Tag>{{ slotProps.data.status }}</Tag>
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <PublishSurveyButton
                v-if="slotProps.data.status === 'created'"
                :surveyId="slotProps.data._id"
                @on-publish="fetchSurveys"
              />
            </template>
          </Column>
        </DataTable>

        <!-- Message when no surveys found -->
        <p v-else>Non ci sono sondaggi disponibili.</p>
      </div></template
    >
  </Card>
</template>

<style></style>
