import { Router } from 'express';
import { createSurveyController } from '../../controllers/townCouncil/surveys/createSurveyController';
import { getSurveyResultsController } from '../../controllers/townCouncil/surveys/getSurveyResultsController';
import { listTownCouncilSurveysController } from '../../controllers/townCouncil/surveys/listTownCouncilSurveysController';
import { readSurveyController } from '../../controllers/townCouncil/surveys/readSurveyController';
import { updateSurveyController } from '../../controllers/townCouncil/surveys/updateSurveyController';
import { getRbacMiddleware } from '../../middlewares/getRbacMiddleware';

const surveysRouter = Router();

// Surveys routes for town council

// Creation of a survey
surveysRouter.post(
  '',
  getRbacMiddleware({ requiredRoles: ['townCouncil'] }),
  createSurveyController,
);

// List all surveys
surveysRouter.get(
  '',
  getRbacMiddleware({ requiredRoles: ['townCouncil'] }),
  listTownCouncilSurveysController,
);

// Read survey by ID
surveysRouter.get('/:surveyId', readSurveyController);

// Update survey by ID
surveysRouter.put(
  '/:surveyId',
  getRbacMiddleware({ requiredRoles: ['townCouncil'] }),
  updateSurveyController,
);

// Get results of a survey by ID
surveysRouter.get(
  '/:surveyId/results',
  getRbacMiddleware({ requiredRoles: ['townCouncil'] }),
  getSurveyResultsController,
);

export default surveysRouter;
