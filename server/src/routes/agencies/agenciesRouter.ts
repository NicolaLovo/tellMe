import { Router } from 'express';
import quizzesRouter from './quizzesRouter';

const agenciesRouter = Router();

agenciesRouter.use('', quizzesRouter);

export default agenciesRouter;
