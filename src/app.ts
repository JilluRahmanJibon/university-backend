/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes/indext';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// will use here application routes
// user route
app.use('/api/v1/', router);

const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);

// global error handler
app.use(globalErrorHandler);

// route not found
app.use(notFound);

export default app;
