import cors from 'cors';
import express from 'express';
import expressListEndpoints from 'express-list-endpoints';
import authRouter from './routes/auth/authRouter';

// Importing the express module to create an Express application
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth/', authRouter);

app.get('/test', (req, res) => {
  res.send(JSON.stringify(expressListEndpoints(app), null, 2));
});

export default app;
