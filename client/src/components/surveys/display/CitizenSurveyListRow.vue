<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import CompileSurveyButton from '@/components/surveys/buttons/CompileSurveyButton.vue'
import { useUserStore } from '@/stores/useUserStore'
import type { Survey } from '@/types/survey/Survey'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  survey: Survey
}>()

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

const canAnswer = ref(false)

const checkIfAlreadyAnswered = async () => {
  try {
    const response = await apiClient.citizens.citizen.surveys.surveyanswer.read({
      uid: userStore.user?.uid as string,
      surveyId: props.survey._id,
    })
    canAnswer.value = response.status === 'error'
  } catch (err) {
    console.error('Errore durante il controllo delle risposte:', err)
    canAnswer.value = false
  }
}

onMounted(checkIfAlreadyAnswered)
</script>

<template>
  <td class="survey-td">{{ survey.title }}</td>
  <td class="survey-td">
    <CompileSurveyButton v-if="canAnswer" :surveyId="survey._id" />
  </td>
</template>

<style>
.survey-td {
  padding: 12px 16px;
}
</style>
