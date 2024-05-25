import mongoose from 'mongoose';
import { UserType } from './user.interface';

const useSchema = new mongoose.Schema<UserType>(
  {
    id: {
      type: String,
      required: true,
    },

    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('user', useSchema);

export default User;
