import { Router } from 'express';
import { createQuizController } from '../../controllers/agency/quizzes/createQuizController';
import { getRbacMiddleware } from '../../middlewares/getRbacMiddleware';

const quizzesRouter = Router();

quizzesRouter.post(
  '/:agencyId/quizzes',
  getRbacMiddleware({
    requiredRoles: ['agency'],
  }),
  createQuizController,
);

// quizzesRouter.get(
//   '/:agencyId/quizzes/:quizId',
//   getRbacMiddleware({
//     requiredRoles: ['agency'],
//   }),
//   createQuizController,
// );

export default quizzesRouter;
