import { AcademicSemesterType } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemester = async (data: AcademicSemesterType) => {
  const result = await AcademicSemester.create(data);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemester,
};
