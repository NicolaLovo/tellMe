<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'

const props = defineProps<{
  surveyId: string
}>()

const emit = defineEmits(['on-publish'])
const userStore = useUserStore()

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
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn.primary {
  background-color: #9578f4;
  color: white;
}

.btn.primary:hover {
  background-color: #815aff;
}
</style>
