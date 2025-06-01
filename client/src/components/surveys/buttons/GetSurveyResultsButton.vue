<script setup lang="ts">
const props = defineProps<{
  surveyId: string
}>()
</script>

<template>
  <Button asChild v-slot="slotProps">
    <RouterLink
      :to="`towncouncil/surveys/${props.surveyId}/results`"
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
