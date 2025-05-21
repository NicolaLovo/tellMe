import { APP_ROUTES } from '@/constants/APP_ROUTES'
import router from '@/router'
import { User } from '@/types/auth/User'

/**
 * Navigates an authenticated user to their respective home page based on their roles.
 * If no user is provided, the function redirects to the default home page.
 */
export const navigateAuthenticatedUserToHome = ({ user }: { user: User | null }) => {
  console.log(user)

  if (!user) {
    router.push(APP_ROUTES.home)
    return
  }

  const { roles } = user

  if (roles.includes('townCouncil')) {
    router.push(APP_ROUTES.townCouncil.home)
    return
  }

  if (roles.includes('citizen')) {
    router.push(APP_ROUTES.citizen.home)
    return
  }

  router.push(APP_ROUTES.home)
}
