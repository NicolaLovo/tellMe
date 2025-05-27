import { Router } from 'express';
import { readSurveyAnswerController } from '../../../controllers/citizen/surveys/readSurveyAnswerController';
import { listCitizenSurveysController } from '../../../controllers/citizen/surveys/listCitizenSurveysController';

const citizenRouter = Router();

citizenRouter.get('/:uid/surveys', listCitizenSurveysController);
citizenRouter.get('/:uid/surveys/:surveyId/answer', readSurveyAnswerController);

export default citizenRouter;
