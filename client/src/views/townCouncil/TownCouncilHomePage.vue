<script setup lang="ts">
import TownCouncilSurveysList from '@/components/surveys/display/TownCouncilSurveysList.vue'
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import Button from 'primevue/button'
</script>

<template>
  <div class="container">
    <h1>Benvenuto comune</h1>
    <div class="buttons-container">
      <div class="button-div">
        <Button
          label="Crea nuovo sondaggio"
          @click="$router.push(APP_ROUTES.townCouncil.createsurvery)"
        />
      </div>
    </div>
    <TownCouncilSurveysList />
  </div>
</template>

<style scoped>
.container {
  padding: 30px;
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.button-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

button {
  width: 100%;
}
</style>
