import { Router } from 'express';
import { createSurveyController } from '../../controllers/surveys/createSurveysController';

const surveyRouter = Router();

surveyRouter.post('/create', createSurveyController);

export default surveyRouter;
