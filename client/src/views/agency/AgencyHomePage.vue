<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function goToChangePassword() {
  router.push(APP_ROUTES.agency.changecredentials)
}

function goToCreateQuiz() {
  router.push(APP_ROUTES.agency.createquiz)
}
</script>

<template>
  <div class="user-container">
    <Card class="card-content">
      <template #title>
        <h1>Benvenuto {{ userStore.user?.email ?? 'ospite' }}!</h1>
      </template>

      <template #content>
        <div class="button-group">
          <Button
            label="Cambia Password"
            class="btn"
            @click="goToChangePassword"
            style="width: 100%; margin-bottom: 0.5rem"
          />
          <Button
            label="Crea Questionario"
            class="btn"
            @click="goToCreateQuiz"
            style="width: 100%"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.user-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.card-content {
  width: 90%;
  max-width: 800px;
}

.button-group {
  margin-top: 1rem;
}

.btn {
  font-weight: 600;
}
</style>
