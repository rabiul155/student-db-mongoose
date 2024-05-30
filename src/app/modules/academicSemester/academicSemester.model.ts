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

academicSemesterSchema.pre('save', async function (next) {
  const isAlreadyExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isAlreadyExist) {
    throw new Error('Semester already exist');
  } else {
    next();
  }
});

const AcademicSemester = mongoose.model<AcademicSemesterType>(
  'academicSemester',
  academicSemesterSchema,
);

export default AcademicSemester;
