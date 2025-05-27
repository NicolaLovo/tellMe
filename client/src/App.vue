<script setup lang="ts">
import router from '@/router'
import { getAuth, signOut } from 'firebase/auth'
// import SurveyCreateForm from './components/surveys/SurveyCreateForm/SurveyCreateForm.vue'
//import SurveyClientView from './components/surveys/visualiseSurvey/SurveyClientView.vue'
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
</script>

<template>
  <header class="app-header">
    <Button @click="goHome" label="Home" />
    <div style="display: flex; justify-content: flex-end; gap: 1rem; align-items: center">
      <Tag
        v-if="userStore.user?.roles?.includes('citizen')"
        :value="userStore.user.email"
        severity="info"
      />
      <Tag v-if="userStore.user?.roles?.includes('townCouncil')" value="Comune" severity="info" />
      <Tag v-if="userStore.user?.roles?.includes('agency')" value="Ente" severity="info" />
      <Button v-if="!!userStore.user" @click="logout" label="Logout" />
    </div>
  </header>
  <Divider />

  <router-view />
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #eaeaea; */
}
</style>
