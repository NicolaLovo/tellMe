<script setup lang="ts">
import AgencyQuizList from '@/components/quizzes/display/AgencyQuizList.vue'
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function goToCreateQuiz() {
  router.push(APP_ROUTES.agency.createquiz)
}
</script>

<template>
  <div class="home-container">
    <div class="content">
      <h1 class="title">Benvenuto {{ userStore.user?.email ?? 'ospite' }}</h1>

      <div class="button-div">
        <Button class="button" @click="goToCreateQuiz">
          Crea Questionario
        </Button>
      </div>
      <div class="quiz-list">
        <AgencyQuizList />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: left;
  font-family: 'Arial', sans-serif;
  padding: 20px;
  width: 100%;
}

.content {
  width: 100%;
}


.quiz-list {
  margin-top: 20px;
  text-align: left;
}
</style>
