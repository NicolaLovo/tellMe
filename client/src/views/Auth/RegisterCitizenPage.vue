<template>
  <div class="register-container">
    <div class="content">
      <h1 class="title">Registrazione</h1>
      <p class="subtitle">Crea il tuo account per iniziare.</p>

      <form @submit.prevent="registerWithEmailAndPassword">
        <input type="email" placeholder="Email" v-model="email" class="input" />
        <input type="password" placeholder="Password" v-model="password" class="input" />
        <button type="submit" class="btn">Registrati</button>
      </form>

      <button @click="registerWithGoogle" class="btn-google">Registrati con Google</button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <p class="alternative">
        Hai già un account? <router-link to="/Login" class="link">Accedi</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const toast = useToast()

const registerWithToken = async (firebaseToken: string) => {
  const apiClient = new ApiClient({})

  const serverResponse = await apiClient.auth.registerCitizen({
    email: email.value,
    firebaseToken,
  })

  if (serverResponse.status === 'error') {
    toast.error(serverResponse.data.message)
    return
  }
  toast.success('Registrazione avvenuta con successo!')
  const userStore = useUserStore()
  userStore.login({
    token: serverResponse.data.token,
  })

  router.push('/SurveyCreator')
}

const registerWithEmailAndPassword = async () => {
  errorMessage.value = '' // Reset errore prima di iniziare

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

// Funzione per registrazione con Google
const registerWithGoogle = async () => {
  errorMessage.value = '' // Reset errore prima di iniziare
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const firebaseToken = await result.user.getIdToken()

    registerWithToken(firebaseToken)
  } catch (error) {
    console.error('Errore Google login:', error)
    errorMessage.value = 'Si è verificato un errore durante la registrazione con Google.'
  }
}
</script>

<style scoped>
.error-message {
  color: #d32f2f;
  background-color: #fce4ec;
  padding: 10px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 0.95rem;
}

.register-container {
  background-color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

.content {
  text-align: center;
  background-color: #f5f3ff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
}

.title {
  font-size: 2.5rem;
  color: #5e4b8b;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 30px;
}

.input {
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 95%;
}

.btn {
  padding: 12px 25px;
  background-color: #8e7cc3;
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
  background-color: #7a68a1;
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
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

.btn-google {
  padding: 12px 25px;
  background-color: #db4437; /* Google Red */
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  width: 100%;
  margin-top: 10px;
}

.btn-google:hover {
  background-color: #c1351d;
}

.btn-google:focus {
  outline: none;
}
</style>
