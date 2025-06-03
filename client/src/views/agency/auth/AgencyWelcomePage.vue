<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import Button from 'primevue/button'
import Card from 'primevue/card'
</script>

<template>
  <div class="user-container">
    <Card class="card-content text-center shadow-4">
      <template #title>
        <h1>Accedi come ente</h1>
      </template>

      <template #content>
        <p>Accedi per continuare.</p>
        <div class="button-group">
          <router-link :to="APP_ROUTES.agency.login" class="btn-link">
            <Button label="Login" class="btn" style="width: 100%" />
          </router-link>
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

.btn-link {
  display: block;
  width: 100%;
}
</style>
