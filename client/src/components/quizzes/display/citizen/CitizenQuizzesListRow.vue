<script setup lang="ts">
import CompileQuizButton from '@/components/quizzes/buttons/CompileQuizButton.vue'
const props = defineProps<{ agencyId: string; quizId: string; answerId: string }>()

function goToQuizPage() {
  const url = `/citizen/${props.agencyId}/quizzes/${props.quizId}/answers/${props.answerId}`
  window.location.href = url
}
</script>

<template>
  <td>
    <CompileQuizButton
      :agencyId="props.agencyId"
      :quizId="props.quizId"
      :answerId="props.answerId"
    />
  </td>
</template>
