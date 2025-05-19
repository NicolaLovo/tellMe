<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function goToChangePassword() {
  router.push(APP_ROUTES.citizen.changecredentials)
}
</script>

<template>
  <div class="user-container">
    <div class="content">
      <h1 class="title">Benvenuto {{ userStore.user?.email }}!</h1>
      <div class="button-group">Hello</div>
      <div class="button-group">
        <button class="btn" @click="goToChangePassword">Cambia Password</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-container {
  background-color: #f0f0f0;
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

.btn {
  padding: 10px 20px;
  background-color: #5e4b8b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #4a3b74;
}
</style>
