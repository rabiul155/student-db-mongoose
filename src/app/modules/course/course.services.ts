import mongoose, { Types } from 'mongoose';
import { QueryBuilders } from '../../utils/queryBuilders';
import {
  CourseFacultyType,
  CourseType,
  PreRequisiteCourses,
} from './course.interface';
import { CourseFacultyModel, CourseModel } from './course.model';
import { AppError } from '../../errors/AppError';

const createCourseIntoDB = async (payload: CourseType) => {
  const result = await CourseModel.create(payload);
  return result;
};
//
const getAllCourseFormDB = async (queryStr: Record<string, unknown>) => {
  const courseQuery = new QueryBuilders(
    // CourseModel.find().populate('preRequisiteCourses.course'),
    CourseModel.find(),
    queryStr,
  )
    .filter()
    .search(['title'])
    .short()
    .select()
    .paginate();
  const results = await courseQuery.Query;

  return results;
};
const getSingleCourseFormDB = async (id: string) => {
  const result = await CourseModel.findById(id);
  return result;
};

const deleteCourseFormDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const updateCourseToDB = async (id: string, payload: Partial<CourseType>) => {
  const { preRequisiteCourses, ...others } = payload;
  const deleteCourse: Types.ObjectId[] = [];
  const addCourse: PreRequisiteCourses[] = [];

  let result: CourseType | null = null;

  if (preRequisiteCourses?.length) {
    for (const val of preRequisiteCourses) {
      if (val?.isDeleted === true) {
        deleteCourse.push(val.course);
      } else {
        addCourse.push(val);
      }
    }
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (Object.keys(others).length) {
      const result1 = await CourseModel.findByIdAndUpdate(id, others, {
        new: true,
        runValidators: true,
        session,
      });

      if (!result1) {
        throw new AppError(400, 'Course update failed');
      }
      result = result1;
    }

    if (deleteCourse.length) {
      const result2 = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deleteCourse } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!result2) {
        throw new AppError(400, 'Course update failed');
      }
      result = result2;
    }

    if (addCourse.length) {
      const result3 = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: addCourse } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!result3) {
        throw new AppError(400, 'Course update failed');
      }
      result = result3;
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const addCourseFacultiesToDB = async (
  id: string,
  payload: Partial<CourseFacultyType>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload.faculties } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};
const removeCourseFacultiesToDB = async (
  id: string,
  payload: Partial<CourseFacultyType>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload.faculties } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFormDB,
  getSingleCourseFormDB,
  deleteCourseFormDB,
  updateCourseToDB,
  addCourseFacultiesToDB,
  removeCourseFacultiesToDB,
};
