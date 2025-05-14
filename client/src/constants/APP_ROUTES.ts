/**
 * A constant object defining the application routes for different user roles and pages.
 */
export const APP_ROUTES = {
  home: '/',
  citizen: {
    register: '/citizen/register',
    login: '/citizen/login',
    home: '/citizen/home',
  },
  townCouncil: {
    login: '/towncouncil/login',
    home: '/towncouncil/home',
    createsurvery: '/towncouncil/createsurvey',
  },
} as const
