<script setup lang="ts">
import router from '@/router'
import { getAuth, signOut } from 'firebase/auth'
import { computed, ref } from 'vue'
import { APP_ROUTES } from './constants/APP_ROUTES'
import { useUserStore } from './stores/useUserStore'

const goHome = () => {
  router.push(APP_ROUTES.home)
}

const auth = getAuth()
const userStore = useUserStore()

const logout = async () => {
  await signOut(auth)
  userStore.logout()
  goHome()
}

const menuItems = computed(() => {
  const items = []

  const roles = userStore.user?.roles || []

  // Show change password button only if user is a citizen or agency (not townCouncil)
  if (roles.includes('citizen') || roles.includes('agency')) {
    items.push({
      label: 'Cambia password',
      icon: 'pi pi-key',
      command: () => {
        if (roles.includes('citizen')) {
          router.push(APP_ROUTES.citizen.changecredentials)
        } else if (roles.includes('agency')) {
          router.push(APP_ROUTES.agency.changecredentials)
        }
      },
    })
  }

  if (roles.includes('townCouncil')) {
    items.push({
      label: 'Registra ente',
      icon: 'pi pi-user-plus',
      command: () => {
        router.push(APP_ROUTES.townCouncil.registeragency)
      },
    })
  }

  if (roles.includes('citizen') || roles.includes('townCouncil')) {
  items.push({
    label: 'Premi',
    icon: 'pi pi-gift',
    command: () => {
      router.push(APP_ROUTES.prizes)
    },
  })
}

  // Always show logout
  items.push({
    label: 'Esci',
    icon: 'pi pi-sign-out',
    command: logout,
  })

  return items
})

const menu = ref()
const toggleMenu = (event: MouseEvent) => {
  menu.value.toggle(event)
}
</script>

<template>
  <header class="app-header">
    <Button @click="goHome" label="Home" />
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 1rem;
        align-items: center;
      "
    >
      <Tag
        v-if="userStore.user?.roles?.includes('citizen')"
        :value="userStore.user.email"
        severity="info"
      />
      <Tag v-if="userStore.user?.roles?.includes('townCouncil')" value="Comune" severity="info" />
      <Tag
        v-if="userStore.user?.roles?.includes('agency')"
        :value="userStore.user.email"
        severity="info"
      />
      <Menu ref="menu" :model="menuItems" popup />
      <Button v-if="!!userStore.user" icon="pi pi-bars" @click="toggleMenu" class="menu-button"/>
    </div>
  </header>
  <Divider />

  <router-view />
</template>

<style scoped>
.app-header {
  padding: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-button{
  background-color: transparent;
  color: #4151b1;
  border: none;
  cursor: pointer;
}
.menu-button:hover, .menu-button:focus {
  background-color: transparent !important;
  border: none !important;
  color: #9fa8da !important;
}


</style>
