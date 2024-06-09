import { Router } from "express";
import { OfferedCourseControllers } from "./offeredCourse.controller";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";

const router = Router()

router.post('/create-offerd-course',validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),OfferedCourseControllers.createOfferedCourse)
router.get('/',OfferedCourseControllers.createOfferedCourse)
router.get('/:id',OfferedCourseControllers.createOfferedCourse)
router.patch('/:id', OfferedCourseControllers.createOfferedCourse)


export const OfferedCouresRoutes= router