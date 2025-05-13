import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import Register from '../views/Auth/RegisterCitizenPage.vue'
import Login from '../views/Auth/CitizenLoginPage.vue'
import CitizenWelcomePage from '../views/CitizenWelcomePage.vue'

import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/utente',
    name: 'Utente',
    component: CitizenWelcomePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
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
