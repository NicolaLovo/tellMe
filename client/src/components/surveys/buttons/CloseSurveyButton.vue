<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  surveyId: string
}>()

const emit = defineEmits(['on-close'])
const userStore = useUserStore()
const toast = useToast()

const onClick = async () => {
  try {
    const apiClient = new ApiClient({
      jwtToken: userStore.user?.token as string,
    })
    const response = await apiClient.townCouncil.surveys.survey.update(
      {
        surveyId: props.surveyId,
      },
      {
        survey: {
          status: 'closed',
        },
      },
    )

    if (response.status === 'error') {
      toast.error('Errore nella chiusura del sondaggio.')
      return
    }

    /**
     * Notify the parent component that the survey has been closed
     */
    emit('on-close')
    toast.success('Sondaggio chiuso con successo!')
  } catch (err) {
    console.error('Errore durante la chiusura del sondaggio:', err)
  }
}
</script>

<template>
  <Button label="Chiudi" @click="onClick" severity="primary" />
</template>

<style scoped></style>
