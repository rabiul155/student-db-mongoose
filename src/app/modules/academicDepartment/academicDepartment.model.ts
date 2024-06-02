import mongoose from 'mongoose';
import { AcademicDepartmentType } from './academicDepartment.interface';
import AcademicFacultyModel from '../academicFaculty/academicFaculty.model';
import { AppError } from '../../errors/AppError';

const academicDepartmentSchema = new mongoose.Schema<AcademicDepartmentType>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: mongoose.Schema.ObjectId,
    ref: AcademicFacultyModel,
  },
});

academicDepartmentSchema.pre('save', async function (next) {
  const isDepExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepExist) {
    throw new AppError(404, 'Department does not exist');
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepExist = await AcademicDepartmentModel.findOne({ query });
  if (!isDepExist) {
    const err = new AppError(404, 'Department does not exist');
    throw err;
  }
  next();
});

const AcademicDepartmentModel = mongoose.model(
  'academicDepartment',
  academicDepartmentSchema,
);

export default AcademicDepartmentModel;
