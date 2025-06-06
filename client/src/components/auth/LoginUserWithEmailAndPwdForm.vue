<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import { navigateAuthenticatedUserToHome } from '@/tools/navigateAuthenticatedUserToHome'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { reactive } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const loginFormData = reactive({
  email: '',
  password: '',
  errorMessage: '',
})

const onSubmit = async () => {
  loginFormData.errorMessage = ''

  try {
    if (!loginFormData.email) {
      loginFormData.errorMessage = "L'email non deve essere vuota."
      return
    }

    if (!loginFormData.password) {
      loginFormData.errorMessage = 'La password non deve essere vuota.'
      return
    }

    // 1. Autentication with Firebase
    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginFormData.email,
      loginFormData.password,
    )

    if (!userCredential.user) {
      loginFormData.errorMessage = 'Utente non trovato.'
      return
    }

    // 2. Obtain Firebase ID token
    const firebaseToken = await userCredential.user.getIdToken()

    const apiClient = new ApiClient({})

    const serverResponse = await apiClient.auth.login({
      firebaseToken,
    })

    if (serverResponse.status === 'error') {
      toast.error(serverResponse.data.message)
      return
    }
    toast.success('Login avvenuto con successo!')
    const userStore = useUserStore()
    const user = userStore.login({
      token: serverResponse.data.token,
    })

    navigateAuthenticatedUserToHome({
      user,
    })
  } catch (error: any) {
    console.error('Errore login:', error)

    const firebaseError = error.code
    const backendError = error.response?.data?.message

    loginFormData.errorMessage =
      firebaseError === 'auth/invalid-credential'
        ? 'Credenziali non valide'
        : backendError || 'Errore durante il login.'
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="form-content">
      <div class="input-field">
        <label for="email" style="align-self: flex-start; margin-bottom: 0.5rem">Email</label>
        <InputText
          id="email"
          type="email"
          v-model="loginFormData.email"
          placeholder="Email"
          style="width: 100%"
        />
      </div>
      <div class="input-field">
        <label for="password" style="align-self: flex-start; margin-bottom: 0.5rem">Password</label>
        <Password
          id="password"
          v-model="loginFormData.password"
          placeholder="Password"
          toggleMask
          :feedback="false"
          width="100%"
          :inputStyle="{ width: '100%' }"
        />
      </div>

      <p v-if="loginFormData.errorMessage" class="error-message">
        {{ loginFormData.errorMessage }}
      </p>

      <Button type="submit" label="Accedi" class="btn" style="width: 100%" />
    </div>
  </form>
</template>

<style scoped>
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
