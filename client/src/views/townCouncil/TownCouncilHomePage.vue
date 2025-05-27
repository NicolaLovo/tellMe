<script setup lang="ts">
import SurveysList from '@/components/surveys/display/SurveysList.vue'
</script>

<template>
  <div class="top-div">
    <h1>Benvenuto comune!</h1>
    <div class="buttons-container">
      <div class="button-div">
        <Button label="Crea sondaggio" @click="$router.push('/towncouncil/createsurvey')" />
      </div>
    </div>
  </div>
  <SurveysList />
</template>

<style scoped>
.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align to left instead of center */
  justify-content: center;
  padding: 20px; /* Add padding for spacing from edges */
}

.button-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
