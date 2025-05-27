<script setup lang="ts">
import SurveysList from '@/components/surveys/display/SurveysList.vue'
</script>

<template>
  <div class="container">
    <h1>Benvenuto comune!</h1>
    <div class="buttons-container">
      <div class="button-div">
        <Button label="Crea sondaggio" @click="$router.push('/towncouncil/createsurvey')" />
      </div>
    </div>
    <SurveysList />
  </div>
</template>

<style scoped>
.container {
  padding: 20px; /* Add padding for spacing from edges */
  gap: 10px; /* Add gap between elements */
  display: flex;
  flex-direction: column;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align to left instead of center */
  justify-content: center;
}

.button-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
