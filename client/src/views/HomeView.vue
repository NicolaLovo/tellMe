<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <main>
    <p class="text-3xl truncate">Hello world!</p>

    <div v-if="userStore.user">
      User:
      {{ userStore.user.email }}
    </div>
    <div v-else>No user logged in</div>
  </main>
</template>
