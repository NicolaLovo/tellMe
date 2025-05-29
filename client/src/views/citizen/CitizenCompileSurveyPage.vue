<script setup lang="ts">
import SurveyCitizenView from '@/components/surveys/visualiseSurvey/SurveyCitizenView.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="citizen-compile-survey-page">
    <h2>Compila Sondaggio</h2>
    <SurveyCitizenView />
    {{ route.params.surveyId }}
  </div>
</template>
