import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterInToDB = async (payload: TAcademicSemester) => {
  // academic semester name code mapper['Fall']
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester code!');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId);
  return result;
};

const updateAcademicSemester = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester code!');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: semesterId },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterInToDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemester,
};
