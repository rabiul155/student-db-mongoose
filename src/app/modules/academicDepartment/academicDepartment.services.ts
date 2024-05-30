import { AcademicDepartmentType } from './academicDepartment.interface';
import AcademicDepartmentModel from './academicDepartment.model';
import academicDepartmentValidationSchema from './academicDepartment.validation';

const createAcademicDepartment = async (payload: AcademicDepartmentType) => {
  academicDepartmentValidationSchema.parse(payload);
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};
const updateAcademicDepartment = async (
  id: string,
  payload: AcademicDepartmentType,
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getAcademicDepartment = async () => {
  const results =
    await AcademicDepartmentModel.find().populate('academicFaculty');
  return results;
};
const getSingleAcademicDepartment = async (id: string) => {
  const results =
    await AcademicDepartmentModel.findById(id).populate('academicFaculty');
  return results;
};
const deleteAcademicDepartment = async (id: string) => {
  const results = await AcademicDepartmentModel.findByIdAndDelete(id);
  return results;
};

export const academicDepartmentServices = {
  createAcademicDepartment,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
