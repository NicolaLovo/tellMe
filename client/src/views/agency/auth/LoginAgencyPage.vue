<script setup lang="ts">
import LoginUserWithEmailAndPwdForm from '@/components/auth/LoginUserWithEmailAndPwdForm.vue'
</script>

<template>
  <div class="login-container">
    <Card class="content">
      <template #title>
        <h1>Login</h1>
      </template>

      <template #content>
        <LoginUserWithEmailAndPwdForm />
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
  color: #8e7cc3;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
