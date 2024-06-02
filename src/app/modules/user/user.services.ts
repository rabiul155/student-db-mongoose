import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterType } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { StudentType } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { NewUserType } from './user.interface';
import UserModel from './user.model';
import { generateStudentId } from './user.utils';
import { AppError } from '../../errors/AppError';

const createStudentIntoDB = async (password: string, student: StudentType) => {
  const user = {} as NewUserType;
  user.password = password || (config.default_password as string);
  user.role = 'student';

  const admissionSemester: AcademicSemesterType | null =
    await AcademicSemester.findById(student.admissionSemester);

  if (!admissionSemester) {
    throw new AppError(404, 'admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //generate user id
    user.id = await generateStudentId(admissionSemester);

    // create user transaction 1
    const newUser = await UserModel.create([user], {
      session,
    });

    if (!newUser.length) {
      throw new AppError(404, 'Error creating user');
    }

    student.id = newUser[0].id;
    student.user = newUser[0]._id;
    const newStudent = await StudentModel.create([student], { session });

    if (!newStudent.length) {
      throw new AppError(404, 'Error creating student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

export const userServices = {
  createStudentIntoDB,
};
