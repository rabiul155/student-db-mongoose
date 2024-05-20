import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes uses
app.use('/api/v1/students', StudentRoutes);

const getAController = (req: Request, res: Response) => {
 res.send("Hello from server")
};

app.get('/', getAController);

export default app;
