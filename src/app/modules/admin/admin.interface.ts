import { Types } from 'mongoose';

export type UserNameType = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type AdminType = {
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
  profileImg: string;
  isDeleted: boolean;
};
