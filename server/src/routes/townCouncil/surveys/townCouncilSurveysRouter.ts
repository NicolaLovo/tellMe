import { Router } from 'express';
import { createSurveyController } from '../../../controllers/townCouncil/surveys/createSurveyController';
import { listTownCouncilSurveysController } from '../../../controllers/townCouncil/surveys/listTownCouncilSurveysController';
import { updateSurveyController } from '../../../controllers/townCouncil/surveys/updateSurveyController';

const townCouncilSurveysRouter = Router();

townCouncilSurveysRouter.post('', createSurveyController);
townCouncilSurveysRouter.get('', listTownCouncilSurveysController);
townCouncilSurveysRouter.put('/:id', updateSurveyController);

export default townCouncilSurveysRouter;
