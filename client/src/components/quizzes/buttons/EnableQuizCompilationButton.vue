<script setup lang="ts">
import { ref } from 'vue'

import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { reactive } from 'vue'
import { useToast } from 'vue-toastification'

const userStore = useUserStore()
const toast = useToast()
const props = defineProps<{
  quizId: string
}>()

const apiClient = new ApiClient({
  // We know that the user is logged in, so we can safely use the token
  jwtToken: userStore.user?.token as string,
})

interface FormState {
  email: string
  errorMessage: string
}

const showModal = ref(false)

const form = reactive<FormState>({
  email: '',
  errorMessage: '',
})

const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

const handleSubmit = async () => {
  if (!validateEmail(form.email)) {
    form.errorMessage = 'Inserisci un indirizzo email valido.'
    return
  }

  form.errorMessage = ''

  const citizenEmailRes = await apiClient.citizens.readCitizenByEmail({
    email: form.email,
  })

  if (citizenEmailRes.status === 'error') {
    form.errorMessage = 'Nessun utente trovato con questa email.'
    return
  }

  const createRes = await apiClient.agencies.agency.quizzes.quiz.answers.create(
    {
      agencyId: userStore.user?.uid as string,
      quizId: props.quizId,
    },
    {
      quizAnswer: {
        _id: '',
        status: 'pending',
        quizId: props.quizId,
        agencyId: userStore.user?.uid as string,
        creationDate: new Date(),
        uid: citizenEmailRes.data.uid,
      },
    },
  )

  if (createRes.status === 'error') {
    toast.error(
      "Errore durante l'abilitazione della compilazione del questionario. Riprova più tardi.",
    )
    return
  }

  toast.success("Compilazione del questionario abilitata correttamente per l'utente.")

  // Optionally reset the form
  form.email = ''
  showModal.value = false
}
</script>

<template>
  <div>
    <!-- Trigger button -->
    <Button label="Abilita compilazione" icon="pi pi-user-plus" @click="showModal = true" />

    <!-- Modal -->
    <Dialog
      v-model:visible="showModal"
      modal
      header="Abilita compilazione questionario"
      :style="{ width: '35rem' }"
    >
      <form @submit.prevent="handleSubmit">
        <div class="form-container">
          <div class="input-group">
            <div>Inserire la mail dell'utente per abilitare la compilazione del questionario.</div>
            <label class="email-label" for="email">Email utente:</label>
            <InputText id="email" v-model="form.email" class="w-full" />
          </div>

          <p v-if="form.errorMessage" class="error-msg">{{ form.errorMessage }}</p>

          <!-- Submit button -->
          <div class="center-div">
            <Button type="submit" label="Abilita" />
          </div>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.center-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.email-label {
  padding-top: 8px;
}

.error-msg {
  color: #d32f2f;
  background-color: #fce4ec;
  padding: 10px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 0.95rem;
}
</style>
