import cors from 'cors';
import express from 'express';
import expressListEndpoints from 'express-list-endpoints';
import { getRbacMiddleware } from './middlewares/getRbacMiddleware';
import authRouter from './routes/auth/authRouter';
import townCouncilRouter from './routes/townCouncil/townCouncilRouter';

// Importing the express module to create an Express application
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth/', authRouter);
app.use(
  '/api/v1/townCouncil/',
  getRbacMiddleware({
    requiredRoles: ['townCouncil'],
  }),
  townCouncilRouter,
);

app.get('/test', (req, res) => {
  res.send(JSON.stringify(expressListEndpoints(app), null, 2));
});

export default app;
