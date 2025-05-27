import { Router } from 'express';
import { createSurveyController } from '../../controllers/townCouncil/surveys/createSurveyController';
import { listTownCouncilSurveysController } from '../../controllers/townCouncil/surveys/listTownCouncilSurveysController';
import { readSurveyController } from '../../controllers/townCouncil/surveys/readSurveyController';
import { updateSurveyController } from '../../controllers/townCouncil/surveys/updateSurveyController';

const surveysRouter = Router();

surveysRouter.post('', createSurveyController);
surveysRouter.get('', listTownCouncilSurveysController);

surveysRouter
  .put('/:surveyId', updateSurveyController)
  .get('/:surveyId', readSurveyController);

export default surveysRouter;
