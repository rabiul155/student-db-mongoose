import cors from 'cors';
import express, { Application } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { userRoute } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/errors/globalErrorHandler';
import { academicSemesterRouter } from './app/modules/academicSemester/academicSemester.route';
import { academicFacultyRouter } from './app/modules/academicFaculty/academicFaculty.router';
import { academicDepartmentRouter } from './app/modules/academicDepartment/academicDepartment.router';
import { adminRouter } from './app/modules/admin/admin.router';
import { facultyRouter } from './app/modules/faculty/faculty.router';
import { courseRouter } from './app/modules/course/course.router';
import { semesterRegistrationRouter } from './app/modules/semesterRegistration/semesterRegistration.router';
import { authRouter } from './app/modules/auth/auth.router';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes uses
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/academicSemester', academicSemesterRouter);
app.use('/api/v1/academicFaculty', academicFacultyRouter);
app.use('/api/v1/academicDepartment', academicDepartmentRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/faculty', facultyRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/semester', semesterRegistrationRouter);
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello form server');
});

app.get('/test', (req, res) => {
  Promise.reject('I am rejected');
});

app.all('*', (req, res) => {
  res.status(400).send('Route not found');
});

app.use(globalErrorHandler);

export default app;
