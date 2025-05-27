<template>
  <div class="user-container">
    <div class="content">
      <h1 class="title">Benvenuto {{ userStore.user?.email }}!</h1>
      <p class="subtitle">Accedi o registrati per continuare.</p>
      dummy agency page
    </div>
  </div>
</template>

<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()

// Nessuna logica al momento
</script>

<style scoped>
.user-container {
  background-color: #f0f0f0;
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

.title {
  font-size: 2.5rem;
  color: #4f0adf;
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
  background-color: #9578f4;
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
  background-color: #815aff; /* Lilla più scuro al passaggio del mouse */
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
}
</style>
