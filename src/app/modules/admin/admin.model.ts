import mongoose from 'mongoose';
import UserModel from '../user/user.model';
import validator from 'validator';
import { UserNameType } from '../student/student.interface';
import { AdminType } from './admin.interface';

const userNameSchema = new mongoose.Schema<UserNameType>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value: string) {
        const check =
          value ===
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return check;
      },
      message: '{VALUE} is not well formatted',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return validator.isAlpha(value);
      },
      message: '{VALUE} does not accept this type of value',
    },
  },
});

const adminSchema = new mongoose.Schema<AdminType>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
    },
    designation: {
      type: String,
      required: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: '{VALUES} is not correct gender type',
      },
      required: true,
    },
    dateOfBirth: { type: Date },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return validator.isEmail(value);
        },
        message: 'Email is not valid',
      },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const AdminModel = mongoose.model<AdminType>('admin', adminSchema);
