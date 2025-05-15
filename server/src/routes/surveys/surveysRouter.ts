import { Router } from 'express';
import { createSurveyController } from '../../controllers/surveys/createSurveysController';
import { getRbacMiddleware } from '../../middlewares/getRbacMiddleware';

const surveyRouter = Router();

surveyRouter.post(
  '/create',
  getRbacMiddleware({
    requiredRoles: ['townCouncil'],
  }),
  createSurveyController,
);

export default surveyRouter;
