<template>
  <div class="login-container">
    <div class="content">
      <h1 class="title">Login</h1>
      <p class="subtitle">Accedi con la tua email e password.</p>

      <form @submit.prevent="login">
        <input type="email" placeholder="Email" v-model="email" class="input" />
        <input type="password" placeholder="Password" v-model="password" class="input" />
        <button type="submit" class="btn">Accedi</button>
      </form>

      <!-- Messaggio di errore -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <p class="alternative">
        Non hai un account? <router-link to="/Register" class="link">Registrati</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types/auth/User'
import axios from 'axios'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import jwtDecode from 'jwt-decode'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  errorMessage.value = ''

  try {
    // 1. Autentication with Firebase
    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    if (!user) {
      errorMessage.value = 'Utente non trovato.'
      return
    }

    // 2. Obtain Firebase ID token
    const firebaseToken = await user.getIdToken()

    // 3. Send the token to the backend
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
      firebaseToken,
    })

    const appToken = response.data?.data?.token
    if (!appToken) {
      throw new Error('Token non ricevuto dal server.')
    }

    // 4. Save the token
    localStorage.setItem('appToken', appToken)

    // 5. Decote the token
    const decoded = jwtDecode<User>(appToken)
    console.log('Utente decodificato:', decoded)

    // 6. Save in the user store
    const userStore = useUserStore()
    userStore.login(decoded)

    router.push('/UtenteLoggato')
  } catch (error: any) {
    console.error('Errore login:', error)

    const firebaseError = error.code
    const backendError = error.response?.data?.message

    errorMessage.value =
      firebaseError === 'auth/invalid-credential'
        ? 'Credenziali non valide'
        : backendError || 'Errore durante il login.'
  }
}
</script>

<style scoped>
.error {
  color: #d9534f;
  font-size: 1rem;
  margin-top: 15px;
}

.login-container {
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
  background-color: #8e7cc3; /* Colore lilla */
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
  background-color: #7a68a1; /* Lilla più scuro al passaggio del mouse */
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
</style>
-->
