import { Router } from 'express';
import { createPrizeController } from '../../controllers/townCouncil/prizes/createPrizeController';
import { listPrizesController } from '../../controllers/townCouncil/prizes/listPrizesController';

const prizesRouter = Router();

// Surveys routes for town council

// Creation of a survey
prizesRouter.post('', createPrizeController);

// List all surveys
prizesRouter.get('', listPrizesController);

export default prizesRouter;
