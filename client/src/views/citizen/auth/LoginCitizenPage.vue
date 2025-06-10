<script setup lang="ts">
import LoginCitizenWithEmailAndPwdForm from '@/components/auth/LoginUserWithEmailAndPwdForm.vue'
import LoginCitizenWithGoogleButton from '@/components/auth/citizen/LoginCitizenWithGoogleButton.vue'
import { APP_ROUTES } from '@/constants/APP_ROUTES'
</script>

<template>
  <div class="login-container">
    <Card class="content">
      <template #title>
        <h1>Login</h1>
      </template>
      <template #content>
        <LoginCitizenWithEmailAndPwdForm />

        <div style="margin-top: 10px">
          <LoginCitizenWithGoogleButton />
        </div>

        <p class="alternative">
          Non hai un account?
          <RouterLink :to="APP_ROUTES.citizen.register" class="link">Registrati</RouterLink>
        </p>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  text-align: center;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.alternative {
  margin-top: 20px;
  font-size: 1rem;
}

.link {
  color: #5c6bc0;
  text-decoration: none;
}

.link:hover {
  color: #3949ab;
}


</style>
