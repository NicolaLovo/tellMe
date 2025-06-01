import { Router } from 'express';
import { createQuizAnswerController } from '../../controllers/agency/quizzes/answers/createQuizAnswerController';
import { getQuizResultsController } from '../../controllers/agency/quizzes/answers/getQuizResultsController';
import { createQuizController } from '../../controllers/agency/quizzes/createQuizController';
import { listAgencyQuizzesController } from '../../controllers/agency/quizzes/listAgencyQuizzesController';
import { getRbacMiddleware } from '../../middlewares/getRbacMiddleware';

const quizzesRouter = Router();

quizzesRouter.post(
  '/:agencyId/quizzes',
  getRbacMiddleware({
    requiredRoles: ['agency'],
  }),
  createQuizController,
);

quizzesRouter.get(
  '/:agencyId/quizzes',
  getRbacMiddleware({
    requiredRoles: ['agency'],
  }),
  listAgencyQuizzesController,
);

quizzesRouter.get(
  '/:agencyId/quizzes/:quizId/results',
  getRbacMiddleware({
    requiredRoles: ['agency'],
  }),
  getQuizResultsController,
);

quizzesRouter.post(
  '/:agencyId/quizzes/:quizId/answers/:uid',
  getRbacMiddleware({
    requiredRoles: ['agency'],
  }),
  createQuizAnswerController,
);

export default quizzesRouter;
