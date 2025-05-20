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

    if (response.status === 'success') {
      emit('on-publish')
      toast.success('Sondaggio pubblicato con successo!')
    } else {
      console.error('Errore nel caricamento dei sondaggi.')
      toast.error('Errore nella pubblicazione del sondaggio.')
    }
  } catch (err) {
    console.error('Errore durante la pubblicazione del sondaggio:', err)
  }
}
</script>

<template>
  <button type="button" @click="onClick" class="btn">Pubblica</button>
</template>

<style scoped>
.btn {
  padding: 12px 25px;
  background-color: #9578f4; /* Colore lilla */
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.btn:hover {
  background-color: #815aff; /* Lilla più scuro al passaggio del mouse */
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
}
</style>
