import mongoose from 'mongoose';
import { SemesterRegistrationType } from './semesterRegistration.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { AppError } from '../../errors/AppError';

const SemesterRegistrationSchema =
  new mongoose.Schema<SemesterRegistrationType>(
    {
      academicSemester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: AcademicSemester,
        unique: true,
        required: true,
      },
      status: {
        type: String,
        enum: ['UPCOMING', 'ONGOING', 'ENDED'],
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      minCredit: {
        type: Number,
        required: true,
        default: 3,
      },
      maxCredit: {
        type: Number,
        required: true,
        default: 15,
      },
    },
    {
      timestamps: true,
    },
  );

SemesterRegistrationSchema.pre('save', async function (next) {
  const isSemesterFound = await AcademicSemester.findById({
    _id: this.academicSemester,
  });

  if (!isSemesterFound) {
    throw new AppError(400, 'Semester not found');
  }
  const isSemesterRegistrationAlreadyExist =
    await SemesterRegistrationModel.findOne({
      academicSemester: this.academicSemester,
    });

  if (isSemesterRegistrationAlreadyExist) {
    throw new AppError(400, 'Semester already exist');
  }
  next();
});

export const SemesterRegistrationModel =
  mongoose.model<SemesterRegistrationType>(
    'semester',
    SemesterRegistrationSchema,
  );
