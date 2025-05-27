import { Router } from 'express';
import citizenSurveyRouter from './surveys/citizenSurveyRouter';

const citizenRouter = Router();

citizenRouter.use('/surveys', citizenSurveyRouter);

export default citizenRouter;
