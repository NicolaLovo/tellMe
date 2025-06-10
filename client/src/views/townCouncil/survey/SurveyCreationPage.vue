<script setup lang="ts">
import SurveyCreateForm from '@/components/surveys/forms/SurveyCreateForm.vue'
</script>

<template>
  <div>
    <h1>Crea un nuovo sondaggio</h1>
    <p class="description">Compila il modulo sottostante per creare un nuovo sondaggio.</p>
    <SurveyCreateForm />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

p {
  color: #5e4b8b;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
}
</style>
