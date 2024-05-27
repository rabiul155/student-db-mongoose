import { AcademicSemesterType } from '../academicSemester/academicSemester.interface';
import UserModel from './user.model';

const findLastStudent = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id.substring(6) || '0000';
};

export const generateStudentId = async (
  academicSemester: AcademicSemesterType,
) => {
  const currentId = await findLastStudent();
  console.log(currentId);

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${academicSemester?.year}${academicSemester.code}${incrementId}`;

  return incrementId;
};
