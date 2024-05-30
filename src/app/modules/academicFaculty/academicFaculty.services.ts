import { AcademicFacultyType } from './academicFaculty.interface';
import AcademicFacultyModel from './academicFaculty.model';
import academicFacultyValidationSchema from './academicFaculty.validation';

const createAcademicFaculty = async (payload: AcademicFacultyType) => {
  academicFacultyValidationSchema.parse(payload);
  const result = await AcademicFacultyModel.create(payload);
  return result;
};
const updateAcademicFaculty = async (
  id: string,
  payload: AcademicFacultyType,
) => {
  const result = await AcademicFacultyModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getAcademicFaculty = async () => {
  const results = await AcademicFacultyModel.find();
  return results;
};
const getSingleAcademicFaculty = async (id: string) => {
  const results = await AcademicFacultyModel.findById(id);
  return results;
};

export const academicFacultyServices = {
  createAcademicFaculty,
  getAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
