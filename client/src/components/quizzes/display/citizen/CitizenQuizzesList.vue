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
      <Card>
        <template #title>
          <h3>Lista questionari</h3>
        </template>
        <template #content>
          <table v-if="quizAnswers.length" class="styled-table">
            <thead>
              <tr>
                <th>Titolo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="quizAnswer in quizAnswers" :key="quizAnswer._id">
                <CitizenQuizzesListRow :quizAnswer="quizAnswer" />
              </tr>
            </tbody>
          </table>
          <p v-else>Non ci sono questionari disponibili.</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.styled-table th,
.styled-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.styled-table thead {
  background-color: #f9f9f9;
}

.styled-table tr:nth-child(even) {
  background-color: #f6f6f6;
}

.styled-table tr:hover {
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}
</style>
