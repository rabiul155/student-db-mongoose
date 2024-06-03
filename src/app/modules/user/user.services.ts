import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterType } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { StudentType } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { NewUserType } from './user.interface';
import UserModel from './user.model';
import { generateAdminId, generateStudentId } from './user.utils';
import { AppError } from '../../errors/AppError';
import { AdminType } from '../admin/admin.interface';
import { AdminModel } from '../admin/admin.model';

const createStudentIntoDB = async (password: string, student: StudentType) => {
  const user = {} as NewUserType;
  user.password = password || (config.default_password as string);
  user.role = 'student';

  const admissionSemester: AcademicSemesterType | null =
    await AcademicSemester.findById(student.admissionSemester);

  if (!admissionSemester) {
    throw new AppError(404, 'admission semester not found');
  }

  //generate user id
  user.id = await generateStudentId(admissionSemester);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create user transaction 1
    const newUser = await UserModel.create([user], {
      session,
    });

    if (!newUser.length) {
      throw new AppError(400, 'Error creating student');
    }

    student.id = newUser[0].id;
    student.user = newUser[0]._id;
    const newStudent = await StudentModel.create([student], { session });

    if (!newStudent.length) {
      throw new AppError(400, 'Error creating student');
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

const createAdminIntoDB = async (password: string, admin: AdminType) => {
  const user = {} as NewUserType;
  user.password = password || (config.default_password as string);
  user.role = 'admin';
  user.id = await generateAdminId();

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await UserModel.create([user], {
      session,
    });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create admin');
    }
    admin.id = newUser[0].id;
    admin.user = newUser[0]._id;
    const newAdmin = await AdminModel.create([admin], {
      session,
    });

    if (!newAdmin.length) {
      throw new AppError(400, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const userServices = {
  createStudentIntoDB,
  createAdminIntoDB,
};
