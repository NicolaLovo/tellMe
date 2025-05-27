import { Router } from 'express';
import citizenRouter from './citizen/citizenRouter';

const citizensRouter = Router();

citizensRouter.use('', citizenRouter);

export default citizensRouter;
