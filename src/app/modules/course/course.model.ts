import mongoose from 'mongoose';
import { CourseType, PreRequisiteCourse } from './course.interface';

const preRequisiteCourseSchema = new mongoose.Schema<PreRequisiteCourse>({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

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
    preRequisiteCourse: [preRequisiteCourseSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const CourseModel = mongoose.model<CourseType>('course', courseSchema);
