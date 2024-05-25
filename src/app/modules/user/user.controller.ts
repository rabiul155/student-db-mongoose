import studentValidationSchema from '../student/student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;

    studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    console.log({ err });
    res.status(403).json({
      success: false,
      message: err?.message || 'Something went wrong',
      error: err,
    });
  }
};

export const userController = {
  createStudent,
};
