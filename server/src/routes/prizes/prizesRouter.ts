import { Router } from 'express';
import { createPrizeController } from '../../controllers/townCouncil/prizes/createPrizeController';
import { listPrizesController } from '../../controllers/townCouncil/prizes/listPrizesController';

const prizesRouter = Router();

// Creation of a prize
prizesRouter.post('', createPrizeController);

// List all prizes
prizesRouter.get('', listPrizesController);

export default prizesRouter;
