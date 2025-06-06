<script lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import DataView from 'primevue/dataview'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { Prize } from '../../../../../server/src/types/prizes/Prize'

const pageIndex = ref(0)
const pageSize = ref(10)
const prizes = ref<Prize[]>([])
const toast = useToast()

const userStore = useUserStore()
const apiClient = new ApiClient({ jwtToken: userStore?.user?.token as string })

const fetchPrizes = async () => {
  try {
    const response = await apiClient.prizes.list({
      pageIndex: pageIndex.value.toString(),
      pageSize: pageSize.value.toString(),
    })

    if (response.status === 'success') {
      prizes.value = response.data.prizes
    } else {
      console.error('Errore nel caricamento dei premi.')
    }
  } catch (err) {
    console.error('Errore durante il caricamento dei premi:', err)
  }
}

onMounted(fetchPrizes)
</script>

<template>
  <div class="prize-list-view">
    <RouterLink v-if="userStore?.user?.role === 'townCouncil'" :to="`townCouncil/createprize`">
      Aggiungi un nuovo premio
    </RouterLink>

    <DataView :value="prizes" layout="grid">
      <template #header>
        <div class="header">
          <h2>Available Prizes</h2>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="p-col-12 p-md-4 p-2">
          <div class="prize-card">
            <h3>{{ slotProps.data.title }}</h3>
            <p><strong>Points:</strong> {{ slotProps.data.points }}</p>
            <small>Created on: {{ formatDate(slotProps.data.creationDate) }}</small>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<style scoped>
.prize-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fdfdfd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.points {
  font-weight: bold;
  color: #0b7dda;
}
.header {
  margin-bottom: 1rem;
}
</style>
