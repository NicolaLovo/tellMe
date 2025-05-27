import { Router } from 'express';
import { listCitizenSurveysController } from '../../../../controllers/citizen/surveys/listCitizenSurveysController';

const citizenSurveysRouter = Router();

citizenSurveysRouter.get('', listCitizenSurveysController);

export default citizenSurveysRouter;
