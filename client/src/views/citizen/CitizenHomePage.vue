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
    <Card class="content">
      <template #title>
        <h1>Benvenuto {{ userStore.user?.email }}!</h1>
      </template>

      <template #content>
        <div class="button-group">
          <Button
            label="Cambia Password"
            class="btn"
            @click="goToChangePassword"
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
  justify-content: center;
  align-items: center;
}

.content {
  width: 90%;
  max-width: 600px;
}
</style>
