<script setup lang="ts">
import PrizeTable from '@/components/prizes/display/PrizeTable.vue'
</script>

<template>
  <div class="container">
    <h1>Lista premi</h1>
    <PrizeTable/>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.button-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

button {
  width: 100%;
}
</style>
