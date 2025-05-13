<template>
  <div class="user-container">
    <div class="content">
      <h1 class="title">Benvenuto, {{ userStore.user?.email }}!</h1>
      <p class="subtitle">Accedi o registrati per continuare.</p>

      <div class="button-group">
        <router-link :to="APP_ROUTES.citizen.login" class="btn">Login</router-link>
        <router-link :to="APP_ROUTES.citizen.register" class="btn">Registrati</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// Nessuna logica al momento
</script>

<style scoped>
.user-container {
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

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.btn {
  width: 200px;
  padding: 12px 25px;
  background-color: #8e7cc3;
  color: white;
  font-size: 1rem;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.btn:hover {
  background-color: #7a68a1; /* Lilla più scuro al passaggio del mouse */
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
}
</style>
