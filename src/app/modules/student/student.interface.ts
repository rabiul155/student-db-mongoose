import { Model, Types } from 'mongoose';

export type UserNameType = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type GuardianType = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGuardianType = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type StudentType = {
  id: string;
  user: Types.ObjectId;
  name: UserNameType;
  gender: 'male' | 'female';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: GuardianType;
  localGuardian: LocalGuardianType;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  profileImg?: string;
  isDeleted: boolean;
};

export type StudentMethodsType = {
  isUserExist(email: string): Promise<boolean>;
  // isUserExist: () => Promise<Student>;
};

export type StudentModelType = Model<
  StudentType,
  Record<string, string>,
  StudentMethodsType
>;
