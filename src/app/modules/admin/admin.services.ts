import mongoose from 'mongoose';
import { AdminType } from './admin.interface';
import { AdminModel } from './admin.model';
import UserModel from '../user/user.model';
import { AppError } from '../../errors/AppError';

const getAllAdminDB = async () => {
  const results = await AdminModel.find();
  return results;
};
const getSingleAdminDB = async (id: string) => {
  const results = await AdminModel.findOne({ id });
  return results;
};
const updateAdminDB = async (id: string, payload: Partial<AdminType>) => {
  if (payload.id) {
    throw new AppError(400, 'Admin id is not updatable');
  }
  const { name, ...others } = payload;
  const modifiedPayload: Record<string, unknown> = {
    ...others,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedPayload[`name.${key}`] = value;
    }
  }

  const results = await AdminModel.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return results;
};

const deleteAdminDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deleteUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(400, 'Failed to delete');
    }
    const results = await AdminModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(400, 'Failed to delete');
    }

    await session.commitTransaction();
    await session.endSession();
    return results;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const adminServices = {
  getAllAdminDB,
  getSingleAdminDB,
  updateAdminDB,
  deleteAdminDB,
};
