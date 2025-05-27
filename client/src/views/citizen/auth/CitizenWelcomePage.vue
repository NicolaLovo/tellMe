<template>
  <div class="user-container">
    <Card>
      <template #title>
        <h1>Accedi come cittadino</h1>
      </template>
      <template #content>
        <div class="button-group">
          <router-link :to="APP_ROUTES.citizen.login">
            <Button label="Login" style="width: 200px" />
          </router-link>
          <router-link :to="APP_ROUTES.citizen.register">
            <Button label="Registrati" style="width: 200px" />
          </router-link>
        </div>
      </template>
    </Card>
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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
