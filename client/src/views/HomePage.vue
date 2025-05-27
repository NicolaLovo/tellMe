<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
</script>

<template>
  <div class="home-container">
    <div class="content">
      <h1 class="title">Benvenuto nella Home Page</h1>

      <div class="button-group">
        <router-link :to="APP_ROUTES.citizen.welcome" class="btn">Utente</router-link>
        <router-link :to="APP_ROUTES.agency.welcome" class="btn">Ente</router-link>
        <router-link :to="APP_ROUTES.townCouncil.welcome" class="btn">Comune</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
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
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.btn {
  width: 120px;
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
  background-color: #815aff;
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
}
</style>
