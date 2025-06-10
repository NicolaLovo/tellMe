<script setup lang="ts">
const props = defineProps<{
  agencyId: string
  quizId: string
}>()
</script>

<template>
  <Button asChild v-slot="slotProps">
    <RouterLink
      :to="`/agency/quizzes/${props.quizId}/results`"
      :class="[(slotProps as any).class, 'no-underline']"
    >
      Visualizza risultati
    </RouterLink>
  </Button>
</template>

<style>
.no-underline {
  text-decoration: none;
}

</style>
