<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
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
  const userStore = useUserStore()
  const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

  const registerResponse = await apiClient.auth.registerAgency({
    email: email.value,
    firebaseToken,
  })

  if (registerResponse.status === 'error') {
    toast.error(registerResponse.data.message)
    return
  }

  toast.success('Registrazione avvenuta con successo!')
  navigateAuthenticatedUserToHome({ user: userStore.user })
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
    await registerWithToken(firebaseToken)
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
        <div class="title-div">
          <h1>Registrazione ente</h1>
        </div>
      </template>
      <template #content>
        <h4 class="subtitle">Compila il modulo per registrare un nuovo ente</h4>
        <form @submit.prevent="registerWithEmailAndPassword">
          <InputText type="email" placeholder="Email" v-model="email" class="input" />
          <InputText type="password" placeholder="Password" v-model="password" class="input" />
          <Button type="submit" class="btn">Registra ente</Button>
        </form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </template>
    </Card>
  </div>
</template>

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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

.input {
  padding: 12px;
  margin: 10px 0;
  font-size: 1rem;
  width: 95%;
}

.btn {
  width: 100%;
}

.title-div {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
