import mongoose from 'mongoose';
import {
  CourseFacultyType,
  CourseType,
  PreRequisiteCourses,
} from './course.interface';
import { FacultyModel } from '../faculty/faculty.model';

const preRequisiteCoursesSchema = new mongoose.Schema<PreRequisiteCourses>(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseModel',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const courseSchema = new mongoose.Schema<CourseType>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: Number,
      required: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: true,
      trim: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

courseSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
});
courseSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
});

export const CourseModel = mongoose.model<CourseType>('course', courseSchema);

const courseFacultySchema = new mongoose.Schema<CourseFacultyType>({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CourseModel,
    unique: true,
  },
  faculties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: FacultyModel,
    },
  ],
});

export const CourseFacultyModel = mongoose.model<CourseFacultyType>(
  'courseFaculty',
  courseFacultySchema,
);
