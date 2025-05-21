<script setup lang="ts">
import SurveysList from '@/components/surveys/display/SurveysList.vue'
</script>

<template>
  <div class="top-div">
    <h1 class="title">Benvenuto comune!</h1>
    <div class="buttons-container">
      <div class="button-div">
        <button class="button" @click="$router.push('/towncouncil/createsurvey')">
          Crea sondaggio
        </button>
        <!-- <button class="button" @click="$router.push('/towncouncil/surveys')">
          Visualizza sondaggi
        </button> -->
      </div>
    </div>
  </div>
  <SurveysList />
</template>

<style scoped>
.top-div {
  background-color: #f0f0f0;
}

.buttons-container {
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align to left instead of center */
  justify-content: center;
  font-family: 'Arial', sans-serif;
  padding: 20px; /* Add padding for spacing from edges */
}

.title {
  font-size: 2.5rem;
  color: #5e4b8b;
  margin-bottom: 20px;
}

.button-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.button {
  background-color: #4f0adf;
  color: white;
  font-size: 1.2rem;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  width: 100%;
}

.button:hover {
  background-color: #36039f;
  transform: scale(1.05);
}

.button:focus {
  outline: none;
}
</style>
