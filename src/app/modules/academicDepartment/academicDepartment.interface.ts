import { Types } from 'mongoose';

export type AcademicDepartmentType = {
  name: string;
  academicFaculty: Types.ObjectId;
};
