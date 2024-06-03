import mongoose, { Types } from 'mongoose';

export type UserNameType = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type FacultyType = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: UserNameType;
  gender: 'male' | 'female' | 'others';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  academicDepartment: mongoose.Types.ObjectId;
  profileImg: string;
  isDeleted: boolean;
};
