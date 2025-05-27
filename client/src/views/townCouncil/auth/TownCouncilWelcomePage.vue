<script setup lang="ts">
import LoginTownCouncilWithPwdForm from '@/components/auth/citizen/LoginTownCouncilWithPwdForm.vue'
</script>

<template>
  <div class="home-container">
    <Card>
      <template #content>
        <div class="card-content">
          <h1>Accedi come Comune</h1>
          <LoginTownCouncilWithPwdForm />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
