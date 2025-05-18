/**
 * A constant object defining the application routes for different user roles and pages.
 */
export const APP_ROUTES = {
  home: '/',
  citizen: {
    welcome: '/citizen/welcome',
    register: '/citizen/register',
    login: '/citizen/login',
    home: '/citizen/home',
  },
  townCouncil: {
    welcome: '/towncouncil/welcome',
    home: '/towncouncil/home',
    createsurvery: '/towncouncil/createsurvey',
    surveylist: '/towncouncil/surveys',
  },
  agency: {
    welcome: '/agency/welcome',
    home: '/agency/home',
  },
} as const
