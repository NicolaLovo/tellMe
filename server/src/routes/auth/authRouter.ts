import { Router } from 'express';
import { loginController } from '../../controllers/auth/loginController';
import { registerCitizenController } from '../../controllers/auth/registerCitizenController';

const authRouter = Router();

// Each route is mapped to a controller function that handles the logic for that HTTP method and path
authRouter.post('/citizens', registerCitizenController); // POST register a citizen
authRouter.post('/login', loginController); // POST login a citizen

// Export this router so is available in app.ts
export default authRouter;
