<script setup lang="ts">
const props = defineProps<{
  surveyId: string
}>()
</script>

<template>
  <Button asChild>
    <Router-link :to="`/citizen/surveys/${props.surveyId}/answer`"> Compila </Router-link>
  </Button>
</template>
