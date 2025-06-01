import { Router } from 'express';
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
  /*getRbacMiddleware({
    requiredRoles: ['agency'],
  }),*/
  listAgencyQuizzesController,
);

export default quizzesRouter;
