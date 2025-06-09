<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import CompileQuizButton from '@/components/quizzes/buttons/CompileQuizButton.vue'
import { useUserStore } from '@/stores/useUserStore'
import { onMounted, ref } from 'vue'

const props = defineProps<{ agencyId: string; quizId: string; answerId: string }>()

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

const quizTitle = ref<string | null>(null)
const error = ref('')

async function loadQuizTitle() {
  try {
    const response = await apiClient.agencies.agency.quizzes.quiz.read({
      agencyId: props.agencyId,
      quizId: props.quizId,
    })

    if (response.status === 'success') {
      quizTitle.value = response.data.quiz.title
    } else {
      error.value = 'Errore nel recupero del quiz'
    }
  } catch (e) {
    error.value = 'Errore nel recupero del quiz'
  }
}

onMounted(loadQuizTitle)
</script>

<template>
  <td class="quiz-td">
    <span v-if="quizTitle">{{ quizTitle }}</span>
    <span v-else-if="error" class="error">{{ error }}</span>
    <span v-else class="loading">Caricamento...</span>
  </td>
  <td class="quiz-td">
    <CompileQuizButton
      :agencyId="props.agencyId"
      :quizId="props.quizId"
      :answerId="props.answerId"
    />
  </td>
</template>

<style scoped>
.quiz-td {
  padding: 12px 16px;
}

.error {
  color: #d32f2f;
}

.loading {
  color: #888;
  font-style: italic;
}

.error {
  color: #d32f2f;
}
.loading {
  color: #888;
  font-style: italic;
}
</style>
