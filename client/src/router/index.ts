import PrizeCreationPage from '@/components/prizes/CreatePrize.vue'
import QuizCreateForm from '@/components/quizzes/QuizCreateForm.vue'
import QuizCitizenView from '@/components/quizzes/visualiseQuiz/QuizCitizenView.vue'
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'
import { UserRole } from '@/types/auth/UserRole'
import AgencyHomePage from '@/views/agency/AgencyHomePage.vue'
import AgencyWelcomePage from '@/views/agency/auth/AgencyWelcomePage.vue'
import LoginAgencyPage from '@/views/agency/auth/LoginAgencyPage.vue'
import ChangeCredentialsPage from '@/views/citizen/auth/ChangeCredentialsPage.vue'
import RegisterAgencyPage from '@/views/citizen/auth/RegisterAgencyPage.vue'
import CitizenCompileSurveyPage from '@/views/citizen/CitizenCompileSurveyPage.vue'
import CitizenHomePage from '@/views/citizen/CitizenHomePage.vue'
import PrizeView from '@/views/prize/PrizeView.vue'
import TownCouncilWelcomePage from '@/views/townCouncil/auth/TownCouncilWelcomePage.vue'
import SurveyCreationPage from '@/views/townCouncil/survey/SurveyCreationPage.vue'
import SurveyResultsPage from '@/views/townCouncil/survey/SurveyResultsPage.vue'
import TownCouncilHomePage from '@/views/townCouncil/TownCouncilHomePage.vue'
import QuizResultsPage from '@/views/agency/quiz/QuizResultsPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import CitizenWelcomePage from '../views/citizen/auth/CitizenWelcomePage.vue'
import CitizenLoginPage from '../views/citizen/auth/LoginCitizenPage.vue'
import RegisterCitizenPage from '../views/citizen/auth/RegisterCitizenPage.vue'
import HomePage from '../views/HomePage.vue'

interface RouteMeta {
  requiresRoles?: UserRole[]
}

// Application route definitions
const routes: Array<RouteRecordRaw> = [
  {
    path: APP_ROUTES.home,
    name: 'Home',
    component: HomePage,
  },
  {
    path: APP_ROUTES.townCouncil.welcome,
    name: 'TownCouncilWelcome',
    component: TownCouncilWelcomePage,
  },
  {
    path: APP_ROUTES.townCouncil.home,
    name: 'TowncouncilHome',
    component: TownCouncilHomePage,
    meta: {
      requiresRoles: ['townCouncil'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.townCouncil.registeragency,
    name: 'RegisterAgency',
    component: RegisterAgencyPage,
    meta: {
      requiresRoles: ['townCouncil'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.townCouncil.createsurvery,
    name: 'SurveyCreation',
    component: SurveyCreationPage,
    meta: {
      requiresRoles: ['townCouncil'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.townCouncil.surveyresults,
    name: 'SurveyResults',
    component: SurveyResultsPage,
    meta: {
      requiresRoles: ['townCouncil'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.townCouncil.createprize,
    name: 'PrizeCreation',
    component: PrizeCreationPage,
    meta: {
      requiresRoles: ['townCouncil'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.citizen.welcome,
    name: 'CitizenWelcome',
    component: CitizenWelcomePage,
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
    component: CitizenHomePage,
    meta: {
      requiresRoles: ['citizen'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.citizen.changecredentials,
    name: 'ChangeCitizenCredentials',
    component: ChangeCredentialsPage,
    meta: {
      requiresRoles: ['citizen'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.citizen.surveyanswer,
    name: 'SurveyAnswer',
    component: CitizenCompileSurveyPage,
    meta: {
      requiresRoles: ['citizen'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.agency.home,
    name: 'AgencyHome',
    component: AgencyHomePage,
    meta: {
      requiresRoles: ['agency'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.agency.welcome,
    name: 'AgencyWelcome',
    component: AgencyWelcomePage,
  },
  {
    path: APP_ROUTES.agency.login,
    name: 'AgencyLogin',
    component: LoginAgencyPage,
  },
  {
    path: APP_ROUTES.agency.createquiz,
    name: 'CreateQuiz',
    component: QuizCreateForm,
    meta: {
      requiresRoles: ['agency'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.agency.changecredentials,
    name: 'ChangeAgencyCredentials',
    component: ChangeCredentialsPage,
    meta: {
      requiresRoles: ['agency'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.citizen.quizanswer,
    name: 'QuizAnswer',
    component: QuizCitizenView,
    meta: {
      requiresRoles: ['citizen'],
    } satisfies RouteMeta,
  },
  {
    path: APP_ROUTES.prizes,
    name: 'Prizes',
    component: PrizeView,
  },
  {
    path: APP_ROUTES.agency.quizresults,
    name: 'QuizResults',
    component: QuizResultsPage,
    meta: {
      requiresRoles: ['agency'],
    } satisfies RouteMeta,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { user } = useUserStore()

  const meta = to.meta as RouteMeta | undefined

  // Redirect authenticated users from Home to their own Home page if authenticated
  if (to.path === APP_ROUTES.home && user) {
    if (user.roles.includes('townCouncil')) {
      next({ path: APP_ROUTES.townCouncil.home })
      return
    }
    if (user.roles.includes('citizen')) {
      next({ path: APP_ROUTES.citizen.home })
      return
    }
    if (user.roles.includes('agency')) {
      next({ path: APP_ROUTES.agency.home })
      return
    }
  }

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
