<script setup lang="ts">
import SurveyCreateForm from '@/components/surveys/form/SurveyCreateForm.vue'
</script>

<template>
  <div class="survey-creation-page">
    <h1 class="title">Crea un nuovo sondaggio</h1>
    <p class="description">Compila il modulo sottostante per creare un nuovo sondaggio.</p>
  <SurveyCreateForm />
  </div>
</template>

<style>
.survey-creation-page {
  background-color: #f0f0f0;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  padding: 20px; /* Padding per un po' di respiro ai bordi */
}

h1 {
  color: #5e4b8b;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
}

p {
  color: #5e4b8b;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
}
</style>