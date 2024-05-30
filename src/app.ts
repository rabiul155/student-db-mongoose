import cors from 'cors';
import express, { Application } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { userRoute } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { academicSemesterRouter } from './app/modules/academicSemester/academicSemester.route';
import { academicFacultyRouter } from './app/modules/academicFaculty/academicFaculty.router';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes uses
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/academicSemester', academicSemesterRouter);
app.use('/api/v1/academicFaculty', academicFacultyRouter);

app.get('/', (req, res) => {
  res.send('Hello form server');
});

app.all('*', (req, res) => {
  res.send('route not found');
});

app.use(globalErrorHandler);

export default app;
