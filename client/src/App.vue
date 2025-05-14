<script setup lang="ts">
import router from '@/router'
import { getAuth, signOut } from 'firebase/auth'
import { APP_ROUTES } from './constants/APP_ROUTES'
import { useUserStore } from './stores/useUserStore'

const goHome = () => {
  router.push(APP_ROUTES.home)
}

const auth = getAuth()
const userStore = useUserStore()

const logout = async () => {
  await signOut(auth)
  userStore.logout()
  goHome()
}
</script>

<template>
  <div>
    <header class="app-header">
      <button @click="goHome" class="home-btn">Home</button>
      <button v-if="!!userStore.user" @click="logout" class="logout-btn">Logout</button>
    </header>

    <router-view />
  </div>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #eaeaea;
}

.home-btn {
  background-color: #8e7cc3;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.home-btn:hover {
  background-color: #7a68a1; /* viola leggermente più scuro al passaggio */
  transform: scale(1.1); /* effetto zoom leggero */
}

.logout-btn {
  background-color: #8e7cc3;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.logout-btn:hover {
  background-color: #7a68a1;
  transform: scale(1.1);
}
</style>
