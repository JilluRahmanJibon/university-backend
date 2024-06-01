import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createacademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmetnInToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is Created successfully!',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentInToDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments is Fatched successfully!',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const {departmentId} =req.params 
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentInToDB(departmentId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Signele Academic department is get successfully!',
        data:result
    })


})
const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params
    const result = await AcademicDepartmentServices.updateAcademicDepartmentInToDB(departmentId,req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message:'Academic Department is Updated successfully!',
        data:result
    })
})

export const AcademicDepartmentControllers = {
    createacademicDepartment,getAllAcademicDepartment,getSingleAcademicDepartment,updateAcademicDepartment
}