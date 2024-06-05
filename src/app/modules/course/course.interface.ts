import { Types } from 'mongoose';

export type PreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type CourseType = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: PreRequisiteCourses[] | [];
  isDeleted: boolean;
};

export type CourseFacultyType = {
  course: Types.ObjectId;
  faculties: Types.ObjectId[];
};
