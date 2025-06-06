<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import { QuizAnswer } from '@/types/quiz/answer/QuizAnswer'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import CitizenQuizzesListRow from './CitizenQuizzesListRow.vue'

const pageIndex = ref(0)
const pageSize = ref(10)
const quizAnswers = ref<QuizAnswer[]>([])
const totalQuizzes = ref<number>(0)

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

const fetchQuizzes = async () => {
  try {
    const response = await apiClient.citizens.citizen.quizzes.list(
      {
        pageIndex: pageIndex.value.toString(),
        pageSize: pageSize.value.toString(),
      },
      { citizenId: userStore.user?.uid as string },
    )

    if (response.status === 'success') {
      quizAnswers.value = response.data.quizzes
      totalQuizzes.value = response.data.metadata.totalCount
    } else {
      console.error('Errore nel caricamento dei questionari.')
    }
  } catch (err) {
    console.error('Errore durante il caricamento dei questionari:', err)
  }
}

onMounted(fetchQuizzes)
</script>
<template>
  <div class="quiz-list-page">
    <div class="quiz-list">
      <Card class="main-card">
        <template #title>
          <h2 class="card-title">Questionari disponibili</h2>
        </template>
        <template #content>
          <table v-if="quizAnswers.length" class="styled-table">
            <thead>
              <tr>
                <th><h4>Titolo</h4></th>
                <th><h4>Compila</h4></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="quizAnswer in quizAnswers" :key="quizAnswer._id">
                <CitizenQuizzesListRow
                  :agencyId="quizAnswer.agencyId"
                  :quizId="quizAnswer.quizId"
                  :answerId="quizAnswer._id"
                />
              </tr>
            </tbody>
          </table>
          <p v-else class="empty-state">Non ci sono questionari disponibili.</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.quiz-list-page {
  padding: 2rem;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.main-card {
  padding: 1.5rem;
  border-radius: 12px;
}

.card-title {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.styled-table th,
.styled-table td {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.styled-table thead {
  background-color: #f3f4f6;
}

.styled-table tr:nth-child(even) {
  background-color: #fafafa;
}

.styled-table tr:hover {
  background-color: #f0f0f0;
  transition: background-color 0.2s ease;
}

.empty-state {
  text-align: center;
  padding: 1rem;
  color: #888;
}
</style>
