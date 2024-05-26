import { catchAsync } from '../../utils/catchAsync';
import { academicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServices.createAcademicSemester(
    req.body,
  );

  res.status(201).json({
    success: true,
    message: 'Academic semester created successfully',
    data: {
      result,
    },
  });
});

export const academicSemesterController = {
  createAcademicSemester,
};
