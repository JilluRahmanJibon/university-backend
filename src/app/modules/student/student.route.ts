import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

// will call controller function
// will get data
router.get('/', StudentController.getAllStudents);
// student get by id
router.get('/:studentId', StudentController.getSingleStudent);
// update router
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);
// delete router
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
