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
    changecredentials: '/citizen/changecredentials',
    surveyanswer: '/citizen/surveys/:surveyId/answer',
  },
  townCouncil: {
    welcome: '/towncouncil/welcome',
    home: '/towncouncil/home',
    createsurvery: '/towncouncil/createsurvey',
    // surveylist: '/towncouncil/surveys',
    registeragency: '/towncouncil/registeragency',
    surveyresults: '/towncouncil/surveys/:surveyId/results',
  },
  agency: {
    welcome: '/agency/welcome',
    home: '/agency/home',
    login: '/agency/login',
    createquiz: '/agency/createquiz',
    changecredentials: '/agency/changecredentials',
  },
} as const
