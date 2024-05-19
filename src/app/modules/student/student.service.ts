import { StudentModel } from './student.model';
import { StudentType } from './student.interface';

const createStudentIntoDB = async (student: StudentType) => {
  // const result = await StudentModel.create(student);
  //  return result;
  try {
    const newStudent = new StudentModel(student);

    const user = await newStudent.isUserExist(student.email);

    if (user) {
      throw new Error('User already exists');
    }

    const result = await newStudent.save();
    return result;
  } catch (error) {
    // Additional logging or custom error handling can be done here
    console.error('Error in createStudentIntoDB:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
