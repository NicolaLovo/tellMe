import cors from 'cors';
import express from 'express';
import expressListEndpoints from 'express-list-endpoints';
import agenciesRouter from './routes/agencies/agenciesRouter';
import authRouter from './routes/auth/authRouter';
import citizensRouter from './routes/citizens/citizensRouter';
import surveysRouter from './routes/surveys/surveysRouter';

// Importing the express module to create an Express application
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth/', authRouter);

app.use('/api/v1/agencies/', agenciesRouter);

app.use('/api/v1/surveys', surveysRouter);

/*app.use(
  '/api/v1/surveys',
  getRbacMiddleware({
    requiredRoles: ['townCouncil'],
  }),
  surveysRouter,
);*/
app.use('/api/v1/citizens/', citizensRouter);

app.get('/test', (req, res) => {
  res.send({
    routes: expressListEndpoints(app),
  });
});

app.get('/', (req, res) => {
  res.send('ok');
});
export default app;

export const sum = (a: number, b: number): number => {
  return a + b;
};
