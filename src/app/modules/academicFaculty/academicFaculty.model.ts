import mongoose from 'mongoose';
import { AcademicFacultyType } from './academicFaculty.interface';

const academicFacultySchema = new mongoose.Schema<AcademicFacultyType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const AcademicFacultyModel = mongoose.model<AcademicFacultyType>(
  'academicFaculty',
  academicFacultySchema,
);

export default AcademicFacultyModel;
