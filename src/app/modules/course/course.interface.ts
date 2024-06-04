import { Types } from 'mongoose';

export type PreRequisiteCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type CourseType = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourse: PreRequisiteCourse[] | [];
  isDeleted: boolean;
};
