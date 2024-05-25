import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller function
// will get data
router.get('/', StudentController.getAllStudents);
// student get by id
router.get('/:studentId', StudentController.getSingleStudent);
// delete router
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
