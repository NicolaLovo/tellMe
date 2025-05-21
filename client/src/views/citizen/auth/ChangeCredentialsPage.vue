<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { getAuth, updatePassword } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const newPassword = ref('')
const errorMessage = ref('')
const router = useRouter()

const submitForm = async () => {
  const auth = getAuth()
  const user = auth.currentUser

  const password = newPassword.value

  if (!password) {
    errorMessage.value = 'Inserisci la nuova password'
    return
  }

  if (password.length < 6 || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errorMessage.value =
      'La password deve avere almeno 6 caratteri, un numero e un carattere speciale.'
    return
  }

  if (user) {
    try {
      await updatePassword(user, password)

      router.push(APP_ROUTES.citizen.home)
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
    <div class="content">
      <h1 class="title">Modifica la tua Password</h1>

      <form @submit.prevent="submitForm" class="form">
        <div class="input-group">
          <label for="newPassword">Nuova Password:</label>
          <input type="password" v-model="newPassword" id="newPassword" required />
        </div>

        <div class="button-group">
          <button type="submit" class="btn">Salva Cambiamenti</button>
        </div>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.change-credentials-container {
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
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.input-group label {
  font-size: 1rem;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  width: 200px;
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
}

.btn:hover {
  background-color: #7a68a1;
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>
