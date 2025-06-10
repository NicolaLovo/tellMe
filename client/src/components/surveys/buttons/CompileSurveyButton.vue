<script setup lang="ts">
const props = defineProps<{
  surveyId: string
}>()
</script>

<template>
  <Button asChild v-slot="slotProps">
    <RouterLink
      :to="`/citizen/surveys/${props.surveyId}/answer`"
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
