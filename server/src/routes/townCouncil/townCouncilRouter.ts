import { Router } from 'express';
import townCouncilSurveysRouter from './surveys/townCouncilSurveysRouter';

const townCouncilRouter = Router();

townCouncilRouter.use('/surveys', townCouncilSurveysRouter);

export default townCouncilRouter;
