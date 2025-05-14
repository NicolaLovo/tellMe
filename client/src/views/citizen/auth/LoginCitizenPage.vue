<script setup lang="ts">
import LoginCitizenWithEmailAndPwdForm from '@/components/auth/citizen/LoginCitizenWithEmailAndPwdForm.vue'
import LoginCitizenWithGoogleButton from '@/components/auth/citizen/LoginCitizenWithGoogleButton.vue'
import { APP_ROUTES } from '@/constants/APP_ROUTES'
</script>

<template>
  <div class="login-container">
    <div class="content">
      <h1 class="title">Login</h1>
      <p class="subtitle">Accedi con la tua email e password.</p>

      <LoginCitizenWithEmailAndPwdForm />

      <div style="margin-top: 10px">
        <LoginCitizenWithGoogleButton />
      </div>

      <p class="alternative">
        Non hai un account?
        <RouterLink :to="APP_ROUTES.citizen.register" class="link">Registrati</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
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
