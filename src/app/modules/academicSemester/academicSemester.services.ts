import { AcademicSemesterType } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

type CourseCodeType = {
  [key: string]: string;
};

const academicCourseCode: CourseCodeType = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

const getAcademicSemester = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemester = async (id: string, data: any) => {
  if (data.name && data.code && academicCourseCode[data.name] !== data.code) {
    throw new Error('Invalid course code');
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const createAcademicSemester = async (data: AcademicSemesterType) => {
  if (data.name && data.code && academicCourseCode[data.name] !== data.code) {
    throw new Error('Invalid course code');
  }
  const result = await AcademicSemester.create(data);
  return result;
};

export const academicSemesterServices = {
  getAcademicSemester,
  createAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
