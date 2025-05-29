<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

// PrimeVue components
import { Quiz } from '@/types/quiz/Quiz'

const pageIndex = ref(0)
const pageSize = ref(10)
const quizAnswers = ref<Quiz[]>([])
const totalQuizzes = ref<number>(0)
const toast = useToast()

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

// const fetchSurveys = async () => {
//   try {
//     const response = await apiClient.citizen.surveys.list(
//       {
//         pageIndex: pageIndex.value.toString(),
//         pageSize: pageSize.value.toString(),
//       },
//       { citizenId: userStore.user?.uid as string },
//     )

//     if (response.status === 'success') {
//       surveys.value = response.data.surveys
//       totalSurveys.value = response.data.metadata.totalCount
//     } else {
//       console.error('Errore nel caricamento dei sondaggi.')
//     }
//   } catch (err) {
//     console.error('Errore durante il caricamento dei sondaggi:', err)
//   }
// }

// const onPageChange = (event: { page: number; rows: number }) => {
//   pageIndex.value = event.page
//   pageSize.value = event.rows
//   fetchSurveys()
// }

// onMounted(fetchSurveys)
</script>

<template>
  <!-- <Card>
    <template #title> Lista dei questionari </template>

    <template #content>
      <table>
        <thead>
          <tr>
            <th>Titolo</th>
            <th>Data di Creazione</th>
            <th>Domande</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="quiz in quizzes" :key="quiz._id">
            <td>{{ quiz.title }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </template>
  </Card> -->
</template>

<style></style>
