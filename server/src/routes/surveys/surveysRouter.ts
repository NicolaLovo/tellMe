import { Router } from 'express';
import { createSurveyController } from '../../controllers/townCouncil/surveys/createSurveyController';
import { getSurveyResultsController } from '../../controllers/townCouncil/surveys/getSurveyResultsController';
import { listTownCouncilSurveysController } from '../../controllers/townCouncil/surveys/listTownCouncilSurveysController';
import { readSurveyController } from '../../controllers/townCouncil/surveys/readSurveyController';
import { updateSurveyController } from '../../controllers/townCouncil/surveys/updateSurveyController';
import { getRbacMiddleware } from '../../middlewares/getRbacMiddleware';

const surveysRouter = Router();
/*
surveysRouter.post('', createSurveyController);
surveysRouter.get('', listTownCouncilSurveysController);

surveysRouter
  .put('/:surveyId', updateSurveyController)
  .get('/:surveyId', readSurveyController)
  .get('/:surveyId/results', getSurveyResultsController);
*/

surveysRouter.post(
  '',
  getRbacMiddleware({ requiredRoles: ['townCouncil'] }),
  createSurveyController,
);
surveysRouter.get(
  '',
  getRbacMiddleware({ requiredRoles: ['townCouncil'] }),
  listTownCouncilSurveysController,
);

surveysRouter.get('/:surveyId', readSurveyController);

surveysRouter.put(
  '/:surveyId',
  getRbacMiddleware({ requiredRoles: ['townCouncil'] }),
  updateSurveyController,
);
surveysRouter.get(
  '/:surveyId/results',
  getRbacMiddleware({ requiredRoles: ['townCouncil'] }),
  getSurveyResultsController,
);

export default surveysRouter;
