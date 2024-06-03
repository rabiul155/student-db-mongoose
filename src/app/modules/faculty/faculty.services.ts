import mongoose from 'mongoose';
import { FacultyType } from './faculty.interface';
import { FacultyModel } from './faculty.model';
import UserModel from '../user/user.model';
import { AppError } from '../../errors/AppError';

const getAllFacultyDB = async () => {
  const results = await FacultyModel.find();
  return results;
};
const getSingleFacultyDB = async (id: string) => {
  const results = await FacultyModel.findOne({ id });
  return results;
};
const updateFacultyDB = async (id: string, payload: Partial<FacultyType>) => {
  if (payload.id) {
    throw new AppError(400, 'Faculty id is not updatable');
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

  const results = await FacultyModel.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return results;
};

const deleteFacultyDB = async (id: string) => {
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
    const results = await FacultyModel.findOneAndUpdate(
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

export const facultyServices = {
  getAllFacultyDB,
  getSingleFacultyDB,
  updateFacultyDB,
  deleteFacultyDB,
};
