import { Router } from 'express';
import { createSurveyController } from '../../../controllers/townCouncil/surveys/createSurveyController';

const townCouncilSurveysRouter = Router();

townCouncilSurveysRouter.post('', createSurveyController);

export default townCouncilSurveysRouter;
