<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import RegisterCitizenWithGoogleButton from '@/components/auth/citizen/RegisterCitizenWithGoogleButton.vue'
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'
import { isEmailValid } from '@/tools/forms/isEmailValid'
import { isPasswordValid } from '@/tools/forms/isPasswordValid'
import { navigateAuthenticatedUserToHome } from '@/tools/navigateAuthenticatedUserToHome'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const toast = useToast()

const registerWithToken = async (firebaseToken: string) => {
  const apiClient = new ApiClient({})

  const registerResponse = await apiClient.auth.registerCitizen({
    email: email.value,
    firebaseToken,
  })

  if (registerResponse.status === 'error') {
    toast.error(registerResponse.data.message)
    return
  }
  toast.success('Registrazione avvenuta con successo!')
  const userStore = useUserStore()
  const user = userStore.login({
    token: registerResponse.data.token,
  })

  navigateAuthenticatedUserToHome({
    user,
  })
}

const registerWithEmailAndPassword = async () => {
  errorMessage.value = ''

  if (!email.value) {
    errorMessage.value = "L'email non deve essere vuota."
    return
  }

  if (!isEmailValid(email.value)) {
    errorMessage.value = "L'email inserita non è valida."
    return
  }

  if (!isPasswordValid(password.value)) {
    errorMessage.value =
      'La password deve essere lunga almeno 6 caratteri, contenere un numero e un carattere speciale.'
    return
  }

  try {
    const credentials = await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    const firebaseToken = await credentials.user.getIdToken()
    registerWithToken(firebaseToken)
  } catch (error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage.value = 'Questa email è già registrata.'
        break
      case 'auth/invalid-email':
        errorMessage.value = "L'email inserita non è valida."
        break
      case 'auth/weak-password':
        errorMessage.value = 'La password è troppo debole. Deve contenere almeno 6 caratteri.'
        break
      default:
        console.error('Errore imprevisto:', error.code)
        errorMessage.value = 'Si è verificato un errore: ' + error.message
    }
  }
}
</script>

<template>
  <div class="register-container">
    <Card class="content">
      <template #title>
        <h1>Registrazione</h1>
      </template>
      <template #content>
        <p>Crea il tuo account per iniziare.</p>

        <form @submit.prevent="registerWithEmailAndPassword">
          <div class="input-field">
            <label for="email" style="align-self: flex-start; margin-bottom: 0.5rem">Email</label>
            <InputText
              id="email"
              type="email"
              v-model="email"
              placeholder="Email"
              style="width: 100%"
            />
          </div>
          <div class="input-field">
            <label for="password" style="align-self: flex-start; margin-bottom: 0.5rem"
              >Password</label
            >
            <Password
              id="password"
              v-model="password"
              placeholder="Password"
              toggleMask
              :feedback="false"
            />
            <!-- inputStyle="width: 100%;" -->
          </div>
          <Button type="submit" label="Registrati" style="width: 100%" />
        </form>
        <div style="margin-top: 10px">
          <RegisterCitizenWithGoogleButton />
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <p class="alternative">
          Hai già un account?
          <router-link :to="APP_ROUTES.citizen.login" class="link">Accedi</router-link>
        </p>
      </template>
    </Card>
  </div>
</template>
<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  max-width: 600px;
  width: 90%;
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

.alternative {
  margin-top: 20px;
  font-size: 1rem;
  color: #333;
}

.link {
  color: #8e7cc3;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
