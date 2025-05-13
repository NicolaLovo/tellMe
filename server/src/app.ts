import express from 'express';

// Importing the express module to create an Express application
const app = express();

app.use(express.json());

export default app;
