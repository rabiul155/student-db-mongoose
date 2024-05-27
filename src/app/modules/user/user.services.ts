import config from '../../config';
import { AcademicSemesterType } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { StudentType } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { NewUserType } from './user.interface';
import UserModel from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, student: StudentType) => {
  try {
    const user = {} as NewUserType;
    user.password = password || (config.default_password as string);
    user.role = 'student';

    const admissionSemester: AcademicSemesterType | null =
      await AcademicSemester.findById(student.admissionSemester);

    if (!admissionSemester) {
      throw new Error('Academic semester not found');
    } else {
      user.id = await generateStudentId(admissionSemester);
    }

    const newUser = await UserModel.create(user);

    if (Object.keys(newUser).length) {
      student.id = newUser.id;
      student.user = newUser._id;
      const newStudent = await StudentModel.create(student);
      return newStudent;
    } else {
      throw new Error('an error occur');
    }
  } catch (error) {
    console.error('Error in createStudentIntoDB:', error);
    throw error;
  }
};

export const userServices = {
  createStudentIntoDB,
};
