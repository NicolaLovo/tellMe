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
  padding: 30px;
  gap: 10px;
  display: flex;
  flex-direction: column;
}

</style>
