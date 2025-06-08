<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { ref, watch } from 'vue'
import { Prize } from '../../../../server/src/types/prizes/Prize'

const title = ref('')
const points = ref<number | null>(null)
const submitting = ref(false)
const submissionSuccess = ref(false)
const submissionError = ref('')

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

const canSubmit = ref(false)

watch([title, points], () => {
  canSubmit.value = !!title.value && points.value !== null && points.value > 0
})

async function submitPrize() {
  submitting.value = true
  submissionError.value = ''
  submissionSuccess.value = false

  if (!userStore.user?.token) {
    submissionError.value = 'Utente non autenticato.'
    submitting.value = false
    return
  }

  const payload: Prize = {
    _id: '', // Server should generate this
    title: title.value.trim(),
    creationDate: new Date(),
    points: points.value!,
  }

  try {
    const response = await apiClient.prizes.create({
      prize: payload,
    })

    if (response.status === 'success') {
      submissionSuccess.value = true
      console.log('Id:', response.data?.prizeId)
    } else {
      submissionError.value = response.data?.message || 'Errore di creazione premio.'
    }
  } catch (error: any) {
    submissionError.value = error?.response?.data?.data?.message || 'Errore di rete o server.'
    console.error('Errore creazione premio:', error)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="prize-form">
    <header class="app-header">
      <h1>Crea un nuovo premio</h1>
    </header>

    <div class="form-group">
      <label for="title">Titolo</label>
      <InputText id="title" v-model="title" :disabled="submitting || submissionSuccess" />
    </div>

    <div class="form-group">
      <label for="points">Punti richiesti</label>
      <InputNumber
        id="points"
        v-model="points"
        :disabled="submitting || submissionSuccess"
        :min="1"
        inputId="points"
      />
    </div>

    <Button
      class="submit-btn"
      label="Crea premio"
      :disabled="!canSubmit || submitting || submissionSuccess"
      @click="submitPrize"
    >
      {{ submitting ? 'Creazione...' : 'Crea premio' }}
    </Button>

    <h3 v-if="submissionSuccess" class="success-msg">Premio creato con successo! 🎉</h3>
    <p v-if="submissionError" class="error-msg">{{ submissionError }}</p>
  </div>
</template>

<style scoped>
.prize-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

.app-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #d6c6f9;
  padding-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.submit-btn {
  width: 100%;
}
</style>
