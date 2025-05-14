import { createRouter, createWebHistory } from 'vue-router'
import CitizenLoginPage from '../views/Auth/CitizenLoginPage.vue'
import RegisterCitizenPage from '../views/Auth/RegisterCitizenPage.vue'
import CitizenWelcomePage from '../views/CitizenWelcomePage.vue'
import Home from '../views/HomePage.vue'

import { APP_ROUTES } from '@/constants/APP_ROUTES'
import TownhallLoginPage from '@/views/Auth/TownhallLoginPage.vue'
import SurveyCreator from '@/views/SurveyCreator.vue'
import TownhallHomePage from '@/views/TownhallHomePage.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: APP_ROUTES.home,
    name: 'Home',
    component: Home,
  },
  {
    path: APP_ROUTES.townhall.login,
    name: 'TownhallLogin',
    component: TownhallLoginPage,
  },
  {
    path: APP_ROUTES.townhall.home,
    name: 'TownhallHome',
    component: TownhallHomePage,
  },
  {
    path: APP_ROUTES.townhall.createsurvery,
    name: 'SurveyCreator',
    component: SurveyCreator,
  },
  {
    path: APP_ROUTES.citizen.register,
    name: 'Register',
    component: RegisterCitizenPage,
  },
  {
    path: APP_ROUTES.citizen.login,
    name: 'Login',
    component: CitizenLoginPage,
  },
  {
    path: APP_ROUTES.citizen.home,
    name: 'CitizenHome',
    component: CitizenWelcomePage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user') // Verifica se l'utente è autenticato

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' }) // Se non autenticato, reindirizza al login
  } else {
    next() // Altrimenti continua la navigazione
  }
})

export default router
