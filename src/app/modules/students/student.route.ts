import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller function
router.post('/create-student', StudentController.createStudent);

// will get data
router.get('/', StudentController.getAllStudents);
// student get by id
router.get('/:studentId', StudentController.getSingleStudent);
export const StudentRoutes = router;
