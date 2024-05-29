import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemisterRoutes } from '../modules/academicSemester/academicSemster.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemisterRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

router.use('/students', StudentRoutes);
router.use('/users', UserRoutes);

export default router;
