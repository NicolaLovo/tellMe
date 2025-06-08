<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'
import { Prize } from '../../../../server/src/types/prizes/Prize'

const title = ref('')
const points = ref<number | null>(null)
const submitting = ref(false)
const submissionSuccess = ref(false)
const submissionError = ref('')

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

const canSubmit = computed(() => {
  return !!title.value.trim() && points.value !== null && points.value > 0
})

watch(points, (val) => {
  console.log('Points changed:', val)
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
        :modelValue="points"
        @input="points = typeof $event.value === 'number' ? $event.value : null"
        :disabled="submitting || submissionSuccess"
        :min="1"
        inputId="points"
      />
    </div>
    <div class="submission-status-div">
      <h3 v-if="submissionSuccess" class="success-msg">Premio creato con successo! 🎉</h3>
      <p v-if="submissionError" class="error-msg">{{ submissionError }}</p>
    </div>
    <div class="buttons-group">
      <Button
        class="submit-btn"
        label="Crea premio"
        :disabled="!canSubmit || submitting || submissionSuccess"
        @click="submitPrize"
      >
        {{ submitting ? 'Creazione...' : 'Crea premio' }}
      </Button>
      <Button class="home-btn" label="Torna alla lista dei premi" @click="$router.push(APP_ROUTES.prizes)" />
    </div>
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
  border-bottom: 2px solid #c5cae9;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.submission-status-div{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
}
</style>
