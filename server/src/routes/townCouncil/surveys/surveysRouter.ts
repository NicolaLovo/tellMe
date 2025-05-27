import { Router } from 'express';
import { createSurveyController } from '../../../controllers/townCouncil/surveys/createSurveyController';
import { listTownCouncilSurveysController } from '../../../controllers/townCouncil/surveys/listTownCouncilSurveysController';
import { updateSurveyController } from '../../../controllers/townCouncil/surveys/updateSurveyController';

const surveysRouter = Router();

surveysRouter.post('', createSurveyController);
surveysRouter.get('', listTownCouncilSurveysController);
surveysRouter.put('/:id', updateSurveyController);

export default surveysRouter;
