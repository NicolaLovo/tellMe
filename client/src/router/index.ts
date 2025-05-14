import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'
import { UserRole } from '@/types/auth/UserRole'
import TownhallLoginPage from '@/views/townCouncil/auth/TownCouncilLoginPage.vue'
import TownhallHomePage from '@/views/townCouncil/TownCouncilHomePage.vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import CitizenLoginPage from '../views/citizen/auth/LoginCitizenPage.vue'
import RegisterCitizenPage from '../views/citizen/auth/RegisterCitizenPage.vue'
import CitizenWelcomePage from '../views/citizen/CitizenWelcomePage.vue'
import Home from '../views/HomePage.vue'

interface RouteMeta {
  requiresRoles?: UserRole[]
}

const routes: Array<RouteRecordRaw> = [
  {
    path: APP_ROUTES.home,
    name: 'Home',
    component: Home,
  },
  {
    path: APP_ROUTES.townCouncil.login,
    name: 'TownhallLogin',
    component: TownhallLoginPage,
  },
  {
    path: APP_ROUTES.townCouncil.home,
    name: 'TownhallHome',
    component: TownhallHomePage,
    meta: {
      /**
       * RBAC: A user must have the 'townCouncil' role to access this route.
       */
      requiresRoles: ['townCouncil'],
    } satisfies RouteMeta,
  },
  /*{
    path: APP_ROUTES.townhall.createsurvery,
    name: 'SurveyCreator',
    component: SurveyCreator,
    meta: { requiresAuth: true },
  },*/
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
  const { user } = useUserStore()

  const meta = to.meta as RouteMeta | undefined

  if (meta && meta.requiresRoles) {
    if (!user) {
      console.error('User not authenticated')
      next({ path: APP_ROUTES.home })
      return
    }

    // Check if the user has the required roles
    const hasAllRequiredRoles = meta.requiresRoles.every((role) => user.roles.includes(role))

    if (!hasAllRequiredRoles) {
      console.error('User does not have the required roles')
      next({ path: APP_ROUTES.home })
      return
    }
  }
  next()
})

export default router
