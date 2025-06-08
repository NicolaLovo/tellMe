<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { useUserStore } from '@/stores/useUserStore'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Prize } from '../../../../../server/src/types/prizes/Prize'

const prizes = ref<Prize[]>([])
const pageIndex = ref(0)
const pageSize = ref(10)

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
      console.log('Premi caricati:', prizes.value)
    } else {
      toast.error('Errore nel caricamento dei premi.')
    }
  } catch (err) {
    console.error('Errore durante il caricamento dei premi:', err)
    toast.error('Errore durante il caricamento dei premi.')
  }
}

onMounted(fetchPrizes)
</script>

<template>
  <div class="prize-list-view">
    <header class="header">
      <template v-if="userStore?.user?.roles?.includes('townCouncil')">
        <RouterLink to="/townCouncil/createprize" custom v-slot="{ navigate }">
          <Button class="add-btn" @click="navigate" label="Aggiungi un nuovo premio" />
        </RouterLink>
      </template>
    </header>

    <div v-if="prizes?.length" class="prize-table">
      <ul class="prize-grid">
        <li v-for="prize in prizes" :key="prize._id" class="prize-card">
          <i class="pi pi-gift" style="font-size: 1.5rem; color: #7986cb; margin-bottom: 0.5rem;"></i>
          <h3>{{ prize.title }}</h3>
          <h5 class="points">Punti: {{ prize.points }}</h5>
        </li>
      </ul>
    </div>

    <div v-else class="empty-state">
      <p>Nessun premio disponibile.</p>
    </div>
  </div>
</template>

<style scoped>
.prize-list-view {
  width: 100%;
}

.header {
  display: flex;
  align-items: left;
  margin-bottom: 1.5rem;
}

.prize-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  list-style: none;
  padding: 0;
  margin: 0;
}

.prize-card {
  border: 1px solid #ddd;
  padding: 1.3rem;
  border-radius: 8px;
  background-color: #fdfdfd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.prize-card:hover {
  transform: scale(1.02);
}


.empty-state {
  text-align: center;
  color: #666;
  padding: 2rem 0;
}

.add-btn {
  background-color: #6226e3;
  border: none;
  color: white;
  font-weight: 500;
}
</style>
