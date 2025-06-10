<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'
import { getAuth, updatePassword } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const newPassword = ref('')
const errorMessage = ref('')
const router = useRouter()

const submitForm = async () => {
  const auth = getAuth()
  const user = auth.currentUser
  const userStore = useUserStore()
  const roles = userStore.user?.roles || []

  const password = newPassword.value.trim()

  if (!password) {
    errorMessage.value = 'Inserisci la nuova password'
    return
  }

  if (password.length < 6 || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errorMessage.value =
      'La password deve avere almeno 6 caratteri, un numero e un carattere speciale.'
    return
  }

  // Check if user is authenticated and bring to respective home page after password change
  if (user) {
    try {
      await updatePassword(user, password)
      if (roles.includes('citizen')) {
        router.push(APP_ROUTES.citizen.home)
      } else if (roles.includes('agency')) {
        router.push(APP_ROUTES.agency.home)
      }
    } catch (error: any) {
      errorMessage.value = error.message
    }
  } else {
    errorMessage.value = 'Utente non autenticato'
  }
}
</script>

<template>
  <div class="change-credentials-container">
    <Card class="content">
      <template #title>
        <h1>Modifica la tua Password</h1>
      </template>
      <template #content>
        <form @submit.prevent="submitForm">
          <div class="form-content">
            <div class="input-field">
              <label for="password" style="align-self: flex-start; margin-bottom: 0.5rem"
                >Password</label
              >
              <Password
                id="password"
                v-model="newPassword"
                placeholder="Password"
                toggleMask
                :feedback="false"
                :inputStyle="{ width: '100%' }"
              />
            </div>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

            <div class="button-group">
              <Button type="submit" label="Salva Cambiamenti" class="btn" style="width: 200px" />
            </div>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.change-credentials-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 90%;
  max-width: 600px;
}

.form-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}

.input-field {
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-bottom: 15px;
}

.error-message {
  color: #d32f2f;
  background-color: #fce4ec;
  padding: 10px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 0.95rem;
}
</style>
