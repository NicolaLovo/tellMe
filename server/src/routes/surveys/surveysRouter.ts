import { Router } from 'express';
import { createSurveyController } from '../../controllers/surveys/createSurveyController';
import { getRbacMiddleware } from '../../middlewares/getRbacMiddleware';

const surveyRouter = Router();

surveyRouter.post(
  '/create',
  getRbacMiddleware({
    requiredRoles: ['townCouncil'],
  }),
  createSurveyController,
);
surveyRouter.put('/:id/publish', )

export default surveyRouter;
