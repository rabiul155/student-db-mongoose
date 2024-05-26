import mongoose from 'mongoose';
import { AcademicSemesterType } from './academicSemester.interface';
import {
  Months,
  academicSemesterCode,
  academicSemesterName,
} from './academicSemester.constant';

const academicSemesterSchema = new mongoose.Schema<AcademicSemesterType>(
  {
    name: {
      type: String,
      enum: academicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const AcademicSemester = mongoose.model<AcademicSemesterType>(
  'academic',
  academicSemesterSchema,
);

export default AcademicSemester;
