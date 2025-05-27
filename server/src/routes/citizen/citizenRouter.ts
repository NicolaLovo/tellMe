import { Router } from 'express';
import citizenSurveysRouter from './surveys/citizenSurveyRouter';

const citizenRouter = Router();

citizenRouter.use('/surveys', citizenSurveysRouter);

export default citizenRouter;
