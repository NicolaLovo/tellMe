import { Router } from 'express';
import { loginController } from '../../controllers/auth/loginController';
import { registerCitizenController } from '../../controllers/auth/registerCitizenController';
import { registerAgencyController } from '../../controllers/auth/registerAgencyController';

const authRouter = Router();

// Each route is mapped to a controller function that handles the logic for that HTTP method and path
// Registration routes
authRouter.post('/citizens', registerCitizenController); // POST register a citizen
authRouter.post('/agencies', registerAgencyController); // POST register a citizen

// Login routes
authRouter.post('/login', loginController); // POST login a citizen

// Export this router so is available in app.ts
export default authRouter;
