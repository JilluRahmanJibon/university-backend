import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseInToDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course created successfully!',
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourseInToDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course fatched Successfully!',
    data: result,
  });
  return result;
});
const getSignleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.getSingleOfferedCounrInToDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course retrived Successfully!',
    data: result,
  });
  return result;
});
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.updateOfferedCourseInToDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Updated Successfully!',
    data: result,
  });
  return result;
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSignleOfferedCourse,
  updateOfferedCourse,
};
