<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
</script>

<template>
  <div class="home-container">
    <Card style="max-width: 60%">
      <template #title>
        <h1>Benvenuto nella Home Page</h1>
      </template>
      <template #content>
        <div class="button-group">
          <router-link :to="APP_ROUTES.citizen.welcome">
            <Button label="Utente" style="width: 100%" />
          </router-link>
          <router-link :to="APP_ROUTES.agency.welcome">
            <Button label="Ente" style="width: 100%" />
          </router-link>
          <router-link :to="APP_ROUTES.townCouncil.welcome">
            <Button label="Comune" style="width: 100%" />
          </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100%;
}
</style>
