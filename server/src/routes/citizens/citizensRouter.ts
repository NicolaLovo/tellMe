import { Router } from 'express';
import { readCitizenByEmailController } from '../../controllers/citizen/readCitizenByEmailController';
import { getRbacMiddleware } from '../../middlewares/getRbacMiddleware';
import citizenRouter from './citizen/citizenRouter';

const citizensRouter = Router();

citizensRouter.get('', readCitizenByEmailController);

citizensRouter.use(
  '',
  getRbacMiddleware({
    requiredRoles: ['citizen'],
  }),
  citizenRouter,
);

export default citizensRouter;
