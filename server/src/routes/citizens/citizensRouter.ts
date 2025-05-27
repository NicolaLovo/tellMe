import { Router } from 'express';
import citizenRouter from './citizen/citizenRouter';

const citizensRouter = Router();

citizensRouter.use('/:id', citizenRouter);

export default citizensRouter;
