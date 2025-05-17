import { Router } from 'express';
import { createSurveyController } from '../../../controllers/townCouncil/surveys/createSurveyController';
import { updateSurveyController } from '../../../controllers/townCouncil/surveys/updateSurveyController';

const townCouncilSurveysRouter = Router();

townCouncilSurveysRouter.post('', createSurveyController);
townCouncilSurveysRouter.put('', updateSurveyController);

export default townCouncilSurveysRouter;
