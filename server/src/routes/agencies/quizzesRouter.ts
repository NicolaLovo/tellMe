import { Router } from 'express';
import { createQuizAnswerController } from '../../controllers/agency/quizzes/answers/createQuizAnswerController';
import { getQuizResultsController } from '../../controllers/agency/quizzes/answers/getQuizResultsController';
import { updateQuizAnswerController } from '../../controllers/agency/quizzes/answers/updateQuizAnswerController';
import { createQuizController } from '../../controllers/agency/quizzes/createQuizController';
import { listAgencyQuizzesController } from '../../controllers/agency/quizzes/listAgencyQuizzesController';
import { readQuizController } from '../../controllers/agency/quizzes/readQuizController';
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

quizzesRouter.get('/:agencyId/quizzes/:quizId', readQuizController);

quizzesRouter.get(
  '/:agencyId/quizzes/:quizId/results',
  getRbacMiddleware({
    requiredRoles: ['agency'],
  }),
  getQuizResultsController,
);

quizzesRouter.post(
  '/:agencyId/quizzes/:quizId/answers',
  getRbacMiddleware({
    requiredRoles: ['agency'],
  }),
  createQuizAnswerController,
);

quizzesRouter.put(
  '/:agencyId/quizzes/:quizId/answers/:quizAnswerId',
  updateQuizAnswerController,
);

export default quizzesRouter;
