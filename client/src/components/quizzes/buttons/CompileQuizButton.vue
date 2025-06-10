<script setup lang="ts">
const props = defineProps<{ agencyId: string; quizId: string; answerId: string }>()
</script>

<template>
  <Button asChild v-slot="slotProps">
    <RouterLink
      :to="`/citizen/${props.agencyId}/quizzes/${props.quizId}/answers/${props.answerId}`"
      :class="[(slotProps as any).class, 'no-underline']"
    >
      Compila
    </RouterLink>
  </Button>
</template>

<style>
.no-underline {
  text-decoration: none;
}
</style>
