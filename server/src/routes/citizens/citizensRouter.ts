import { Router } from 'express';
import { readCitizenByEmailController } from '../../controllers/citizen/readCitizenByEmailController';
import { getRbacMiddleware } from '../../middlewares/getRbacMiddleware';
import citizenRouter from './citizen/citizenRouter';

const citizensRouter = Router();

citizensRouter.use(
  '',
  getRbacMiddleware({
    requiredRoles: ['citizen'],
  }),
  citizenRouter,
);

citizensRouter.get('', readCitizenByEmailController);

export default citizensRouter;
