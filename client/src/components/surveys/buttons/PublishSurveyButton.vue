<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  surveyId: string
}>()

const emit = defineEmits(['on-publish'])
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
          status: 'published',
        },
      },
    )

    if (response.status === 'error') {
      toast.error('Errore nella pubblicazione del sondaggio.')
      return
    }

    /**
     * Notify the parent component that the survey has been published
     */
    emit('on-publish')
    toast.success('Sondaggio pubblicato con successo!')
  } catch (err) {
    console.error('Errore durante la pubblicazione del sondaggio:', err)
  }
}
</script>

<template>
  <Button label="Pubblica" @click="onClick" severity="primary" />
</template>

<style scoped></style>
