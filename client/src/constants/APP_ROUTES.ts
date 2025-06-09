/**
 * A constant object defining the application routes for different user roles and pages.
 */
export const APP_ROUTES = {
  home: '/',
  prizes: '/prizes',
  citizen: {
    welcome: '/citizen/welcome',
    register: '/citizen/register',
    login: '/citizen/login',
    home: '/citizen/home',
    changecredentials: '/citizen/changecredentials',
    surveyanswer: '/citizen/surveys/:surveyId/answer',
    quizanswer: '/citizen/:agencyId/quizzes/:quizId/answers/:answerId',
  },
  townCouncil: {
    welcome: '/towncouncil/welcome',
    home: '/towncouncil/home',
    createsurvery: '/towncouncil/createsurvey',
    // surveylist: '/towncouncil/surveys',
    registeragency: '/towncouncil/registeragency',
    surveyresults: '/towncouncil/surveys/:surveyId/results',
    createprize: '/towncouncil/createprize',
  },
  agency: {
    welcome: '/agency/welcome',
    home: '/agency/home',
    login: '/agency/login',
    createquiz: '/agency/createquiz',
    changecredentials: '/agency/changecredentials',
    quizresults: '/agency/quizzes/:quizId/results',
  },
} as const
