import { StudentModel } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id);
  if (!result) {
    throw new Error('No data found');
  } else {
    return result;
  }
};
const deleteStudent = async (id: string) => {
  const result = await StudentModel.findByIdAndDelete(id);
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudent,
};
