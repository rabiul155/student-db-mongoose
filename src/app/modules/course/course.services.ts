import { QueryBuilders } from '../../utils/queryBuilders';
import { CourseType } from './course.interface';
import { CourseModel } from './course.model';

const createCourseIntoDB = async (payload: CourseType) => {
  const result = await CourseModel.create(payload);
  return result;
};
//
const getAllCourseFormDB = async (queryStr: Record<string, unknown>) => {
  const courseQuery = new QueryBuilders(
    // CourseModel.find().populate('preRequisiteCourse.course'),
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
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourse.course',
  );
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
  const result = await CourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFormDB,
  getSingleCourseFormDB,
  deleteCourseFormDB,
  updateCourseToDB,
};
