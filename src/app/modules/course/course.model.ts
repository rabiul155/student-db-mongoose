import mongoose from 'mongoose';
import { CourseType, PreRequisiteCourse } from './course.interface';

const preRequisiteCourseSchema = new mongoose.Schema<PreRequisiteCourse>(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseModel',
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
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
    preRequisiteCourse: [preRequisiteCourseSchema],
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
