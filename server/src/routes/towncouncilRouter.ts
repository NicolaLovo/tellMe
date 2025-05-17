import express from 'express';
import { createSurveyController } from '../controllers/townCouncil/surveys/createSurveyController';
const towncouncilRouter = express.Router();

towncouncilRouter.post('/surveys', createSurveyController);

export default towncouncilRouter;
