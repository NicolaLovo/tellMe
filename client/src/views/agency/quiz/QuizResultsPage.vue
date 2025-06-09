<script setup lang="ts">
import AgencyQuizResultTable from '@/components/quizzes/display/AgencyQuizResultTable.vue'
import { useUserStore } from '@/stores/useUserStore'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const agencyId = userStore.user?.uid as string

const route = useRoute()
const quizId = route.params.quizId as string
</script>

<template>
  <AgencyQuizResultTable :agencyId="agencyId" :quizId="quizId" />
</template>
