<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import { navigateAuthenticatedUserToHome } from '@/tools/navigateAuthenticatedUserToHome'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const errorMessage = ref('')
const toast = useToast()

const loginUser = async (body: { firebaseToken: string; email: string }) => {
  const apiClient = new ApiClient({})
  const loginRes = await apiClient.auth.login(body)
  return loginRes
}

const registerInexistentUser = async (body: { firebaseToken: string; email: string }) => {
  const apiClient = new ApiClient({})
  const registerRes = await apiClient.auth.registerCitizen(body)
  return registerRes
}

const onClick = async () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  try {
    /**
     * Firebase creates a new user if the email is not already registered
     * so we need to check if the user is already registered
     * and if not, we need to register it in our backend
     *
     * For this reason we first call `loginUser` and if it fails
     * we call `registerInexistentUser`
     */
    const result = await signInWithPopup(auth, provider)

    if (!result.user.email) {
      errorMessage.value = 'Email non trovata.'
      return
    }

    const firebaseToken = await result.user.getIdToken()

    const loginResponse = await loginUser({
      firebaseToken,
      email: result.user.email,
    })

    let token: string | null = null

    if (loginResponse.status === 'error') {
      const registerResponse = await registerInexistentUser({
        firebaseToken,
        email: result.user.email,
      })

      if (registerResponse.status === 'error') {
        toast.error(registerResponse.data.message)
        return
      }
      token = registerResponse.data.token
    } else {
      token = loginResponse.data.token
    }

    if (!token) {
      errorMessage.value = 'Autenticazione fallita. Riprova più tardi.'
      return
    }

    toast.success('Registrazione avvenuta con successo!')
    const userStore = useUserStore()
    const user = userStore.login({
      token,
    })

    navigateAuthenticatedUserToHome({
      user,
    })
  } catch (error) {
    console.error('Errore Google login:', error)
    errorMessage.value = 'Si è verificato un errore durante la registrazione con Google.'
  }
}
</script>

<template>
  <button @click="onClick" class="btn">Accedi con google</button>
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
  width: 100%;
}

.btn:hover {
  background-color: #815aff; /* Lilla più scuro al passaggio del mouse */
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
}
</style>
