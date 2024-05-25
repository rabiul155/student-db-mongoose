/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { userRoute } from './app/modules/user/user.route';
import { globalErrorhandler } from './app/middleware/globalErrorHanler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes uses
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', userRoute);

const getAController = (req: Request, res: Response) => {
  res.send('Hello from server');
};

app.get('/', getAController);

app.all('*', (req, res) => {
  res.send('route not found');
});

app.use(globalErrorhandler);

export default app;
