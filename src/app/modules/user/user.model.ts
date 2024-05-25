import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from './user.interface';

const userSchema = new mongoose.Schema<UserType>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
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

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
