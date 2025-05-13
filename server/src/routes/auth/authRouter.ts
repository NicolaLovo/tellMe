import { Router } from 'express';
import { registerCitizenController } from '../../controllers/auth/registerCitizenController';
import { loginController } from '../../controllers/auth/loginController';


const authRouter = Router();

// Each route is mapped to a controller function that handles the logic for that HTTP method and path
authRouter.post('/register/citizen', registerCitizenController);       // POST register a citizen
authRouter.post('/login', loginController);                            // POST login a citizen

// Export this router so is available in app.ts 
export default authRouter;