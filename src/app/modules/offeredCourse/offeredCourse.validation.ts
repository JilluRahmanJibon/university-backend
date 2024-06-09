import z from 'zod';
import { Days } from './offeredCourse.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semisterRegistration: z.string(),
    academicSemister: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number().positive(),
    section: z.string(),
    days: z.enum([...(Days as [string, ...string[]])]),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const OfferedCourseValidations = { createOfferedCourseValidationSchema };
