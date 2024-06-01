import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// create new student
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  
  // data validation using zod
  // const zodparsedData = studentValidationSchema.parse(studentData);
  
  // data validation using
 
  
  const result = await UserServices.createStudentInToDB(password, studentData);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
