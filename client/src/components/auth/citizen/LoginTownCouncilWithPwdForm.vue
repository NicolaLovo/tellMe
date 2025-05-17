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
    <input type="password" placeholder="Password" v-model="loginFormData.password" class="input" />
    <button type="submit" class="btn">Accedi</button>
  </form>
  <p v-if="loginFormData.errorMessage" class="error">{{ loginFormData.errorMessage }}</p>
</template>

<style scoped>
.btn {
  padding: 12px 25px;
  background-color: #9578f4;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  width: 95%;
  margin: 10px 0;
}

.btn:hover {
  background-color: #815aff;
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
}

.input {
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 95%;
}

input:focus {
  border-color: #815aff;
  outline: none;
}
</style>
