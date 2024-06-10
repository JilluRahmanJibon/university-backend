import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';

const createOfferedCourseInToDB = async (payload: Partial<TOfferedCourse>) => {
  const {
    semisterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;
  // check if the semester registration id is exists
  const isSemisterRegistrationExists =
    await SemesterRegistration.findById(semisterRegistration);
  if (!isSemisterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration not found!',
    );
  }
  const academicSemister = isSemisterRegistrationExists.academicSemester;
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found!');
  }
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found!');
  }

  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found!');
  }

  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found!');
  }

  const result = await OfferedCourse.create({ ...payload, academicSemister });
  return result;
};

const getAllOfferedCourseInToDB = async (query: Record<string, unknown>) => {
  const queryOfferedCourse = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .fields();
  const result = queryOfferedCourse.modelQuery;
  return result;
};

const getSingleOfferedCounrInToDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};
const updateOfferedCourseInToDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  const result = await OfferedCourse.findByIdAndUpdate(id, payload);
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseInToDB,
  getAllOfferedCourseInToDB,
  getSingleOfferedCounrInToDB,
  updateOfferedCourseInToDB,
};
