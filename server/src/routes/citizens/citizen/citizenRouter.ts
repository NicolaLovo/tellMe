import { Router } from 'express';
import { listCitizenQuizzesController } from '../../../controllers/citizen/quizzes/listCitizenQuizzesController';
import { createSurveyAnswerController } from '../../../controllers/citizen/surveys/createSurveyAnswerController';
import { listCitizenSurveysController } from '../../../controllers/citizen/surveys/listCitizenSurveysController';
import { readSurveyAnswerController } from '../../../controllers/citizen/surveys/readSurveyAnswerController';

const citizenRouter = Router();

citizenRouter.get('/:uid/surveys', listCitizenSurveysController);
citizenRouter.get('/:uid/surveys/:surveyId/answer', readSurveyAnswerController);
citizenRouter.post(
  '/:uid/surveys/:surveyId/answer',
  createSurveyAnswerController,
);
citizenRouter.get('/:uid/quizzes', listCitizenQuizzesController);

export default citizenRouter;
