<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import { QuizAnswer } from '@/types/quiz/answer/QuizAnswer'
import { Quiz } from '@/types/quiz/Quiz'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  quizAnswer: QuizAnswer
}>()

const quiz = ref<Quiz | null>(null)

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

const fetchQuizzes = async () => {
  try {
    const response = await apiClient.agencies.agency.quizzes.quiz.read({
      quizId: props.quizAnswer.quizId,
      agencyId: props.quizAnswer.agencyId,
    })

    if (response.status === 'success') {
      quiz.value = response.data.quiz
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
  <td class="quiz-td">{{ quiz?.title }}</td>
  <td class="quiz-td"></td>
</template>

<style scoped></style>
