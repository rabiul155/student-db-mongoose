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
  return lastStudent?.id;
};

export const generateStudentId = async (
  academicSemester: AcademicSemesterType,
) => {
  let lastStudentId = '0';
  const currentId = await findLastStudent();
  const currentYear = currentId?.substring(0, 4);
  const currentCode = currentId?.substring(4, 6);
  const id = currentId?.substring(6);

  if (
    currentId &&
    currentYear === academicSemester?.year &&
    currentCode === academicSemester.code
  ) {
    lastStudentId = (Number(id) + 1).toString();
  }
  let incrementId = (Number(lastStudentId) + 1).toString().padStart(4, '0');
  incrementId = `${academicSemester?.year}${academicSemester.code}${incrementId}`;

  return incrementId;
};
