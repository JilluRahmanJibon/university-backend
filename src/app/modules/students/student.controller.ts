import { Request, Response } from 'express';
import { StudentService } from './student.service';
import studentValidationSchema from './student.zod.validation';

// create new student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // data validation using zod
    const zodparsedData = studentValidationSchema.parse(studentData);

    // studentValidationSchema call from studentData.validation
    // const { error, value } = studentValidationSchema.validate(studentData);

    // data validation using
    const result = await StudentService.createStudentInToDB(zodparsedData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong when try to get data',
      error: err,
    });
  }
};
// get a student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || `Something wen wrong when get by id`,
      error: err,
    });
  }
};

// delete a student
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result= await StudentService.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: `Students is deleted successfully with this student id:${studentId}`,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'cannot delete the student',
    
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
