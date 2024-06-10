import z from 'zod';
import { Days } from './offeredCourse.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semisterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number().positive(),
    section: z.string(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

const updatedOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().positive().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]]).optional()),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updatedOfferedCourseValidationSchema,
};
