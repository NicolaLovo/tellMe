<script setup lang="ts">
import CitizenQuizList from '@/components/quizzes/display/citizen/CitizenQuizList.vue'
import CitizenSurveyList from '@/components/surveys/display/CitizenSurveyList.vue'
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()

function goToChangePassword() {
  router.push(APP_ROUTES.citizen.changecredentials)
}
</script>

<template>
  <div class="user-container">
    <div class="card-content">
      <div class="content-list"><CitizenSurveyList /></div>
      <div class="content-list"><CitizenQuizList /></div>
    </div>
  </div>
</template>

<style scoped>
.user-container {
  min-height: 100vh;
  gap: 10px;
  padding: 20px;
}

.card-content {
  max-width: 100%;
  display: flex;
  justify-content: center;
}

.content-list {
  width: 100%;
  padding: 20px;
}
</style>
