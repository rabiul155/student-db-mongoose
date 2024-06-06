import { QueryBuilders } from '../../utils/queryBuilders';
import { SemesterRegistrationType } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: SemesterRegistrationType,
) => {
  const result = await SemesterRegistrationModel.create(payload);

  return result;
};

const getAllSemesterRegistration = async (
  queryStr: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilders(
    SemesterRegistrationModel.find().populate('academicSemester'),
    queryStr,
  )
    .filter()
    .short()
    .paginate();

  const results = await semesterRegistrationQuery.Query;
  return results;
};
const getSingleSemesterRegistration = async (id: string) => {
  const result =
    await SemesterRegistrationModel.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistration = async (
  id: string,
  payload: Partial<SemesterRegistrationType>,
) => {
  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteSemesterRegistration = async (id: string) => {
  const result = await SemesterRegistrationModel.findByIdAndDelete(id);
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
