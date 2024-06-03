import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { AppError } from '../../errors/AppError';
import UserModel from '../user/user.model';
import { StudentType } from './student.interface';
import { QueryBuilders } from '../../utils/queryBuilders';

const getAllStudentsFromDB = async (queryStr: Record<string, unknown>) => {
  // const queryObj = { ...queryStr };

  // let Query = StudentModel.find();

  //use for searching
  // const search = queryStr.search || '';
  // const searchTerm = ['email', 'name.firstName', 'presentAddress'];
  // Query = Query.find({
  //   $or: searchTerm.map((field) => {
  //     return { [field]: { $regex: search, $options: 'i' } };
  //   }),
  // });

  // filtering
  // const excludeFields = ['search', 'page', 'sort', 'limit', 'fields'];
  // excludeFields.forEach((field) => delete queryObj[field]);
  // Query = Query.find(queryObj);

  // sorting
  // const sort = queryStr?.sort ? (queryStr?.sort as string) : '-createdAt';
  // Query = Query.sort(sort);

  // paginate
  // const page = Number(queryStr.page as string) || 1;
  // const limit = Number(queryStr.limit as string) || 10;
  // const skip = (page - 1) * limit;
  // Query = Query.skip(skip).limit(limit);

  //select
  // const fields = (queryStr.fields as string).split(',').join(' ') || '-__v';
  // Query = Query.select(fields);

  const searchTerm = ['email', 'name.firstName', 'presentAddress'];

  const queryBuilders = new QueryBuilders(
    StudentModel.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    queryStr,
  )
    .filter()
    .search(searchTerm)
    .short()
    .select()
    .paginate();

  const results = await queryBuilders.Query;

  if (!results.length) {
    throw new AppError(400, 'Student not found');
  }
  return results;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  if (!result) {
    throw new AppError(400, 'No data found');
  } else {
    return result;
  }
};

const updateStudent = async (id: string, payload: Partial<StudentType>) => {
  const { name, guardian, localGuardian, ...remaining } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remaining,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdateData,
    {
      new: true,
    },
  );
  return result;
};

const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(400, 'Error deleting student try again');
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(400, 'Error deleting student try again');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudent,
  updateStudent,
};
