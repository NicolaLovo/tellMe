<script setup lang="ts">
import CitizenQuizzesList from '@/components/quizzes/display/citizen/CitizenQuizzesList.vue'
import CitizenSurveysList from '@/components/surveys/display/CitizenSurveysList.vue'
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
    <Card class="card-content">
      <template #title>
        <h1>Benvenuto {{ userStore.user?.email }}!</h1>
      </template>

      <template #content>
        <div class="button-group">
          <Button
            label="Cambia Password"
            class="btn"
            @click="goToChangePassword"
            style="width: 100%"
          />
        </div>
      </template>
    </Card>
    <div class="card-content">
      <div class="content-list"><CitizenSurveysList /></div>
      <div class="content-list"><CitizenQuizzesList /></div>
    </div>
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
  padding: 20px;
}


.card-content {
  max-width: 100%;
  display: flex;
  justify-content: center;
}

.content-list {
  padding: 20px;
}
</style>
