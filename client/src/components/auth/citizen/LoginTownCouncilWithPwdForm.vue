<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import { navigateAuthenticatedUserToHome } from '@/tools/navigateAuthenticatedUserToHome'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { reactive } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const loginFormData = reactive({
  password: '',
  errorMessage: '',
})

const onSubmit = async () => {
  loginFormData.errorMessage = ''
  if (!loginFormData.password) {
    loginFormData.errorMessage = 'Per favore inserisci la password.'
    return
  }

  try {
    // Autentication with Firebase
    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(
      auth,
      'comune@tellme.com',
      loginFormData.password,
    )

    if (!userCredential.user) {
      loginFormData.errorMessage = 'Utente non trovato.'
      return
    }

    // Obtain Firebase ID token
    const firebaseToken = await userCredential.user.getIdToken()

    // Call the backend API to login
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
    <div class="form-container">
      <div style="display: block; margin-bottom: 1rem">
        <label for="password" style="display: block; margin-bottom: 0.5rem">
          Inserisci la tua password per accedere:
        </label>
        <Password
          id="password"
          v-model="loginFormData.password"
          placeholder="Password"
          toggleMask
          :feedback="false"
        />
      </div>
      <p v-if="loginFormData.errorMessage" class="error">{{ loginFormData.errorMessage }}</p>

      <div class="center">
        <Button type="submit" label="Accedi" style="width: 200px" />
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.p-field {
  display: block;
  /* width: 100%;
  background-color: red; */
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
