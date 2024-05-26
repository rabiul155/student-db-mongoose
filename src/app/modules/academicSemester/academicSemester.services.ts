import { AcademicSemesterType } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

type CourseCodeType = {
  [key: string]: string;
};

const getAcademicSemester = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemester = async (id) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemester = async (id, data) => {
  const result = await AcademicSemester.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const createAcademicSemester = async (data: AcademicSemesterType) => {
  const academicCourseCode: CourseCodeType = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };
  if (academicCourseCode[data.name] !== data.code) {
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
