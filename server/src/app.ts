import express from 'express';
import authRouter from './routes/auth/authRouter';

// Importing the express module to create an Express application
const app = express();

app.use(express.json());

app.use('/api/v1', authRouter);

export default app;
