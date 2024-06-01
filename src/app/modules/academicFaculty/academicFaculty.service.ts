import { AcademicFaculty } from './academicFaculty.model';
import { TAcademicFaculty } from './academicFaculty.interface';

const createAcademiFacultyInToDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

const getAllAcademicFacultyInToDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyInToDB = async (id: string) => {
  const result = await AcademicFaculty.findOne({id});
  return result;
};

const updateFacultyInToDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ id: id }, payload, {
    new: true,
  });
  return result;
};
export const AcademicFacultyServices = {
  createAcademiFacultyInToDB,
  getAllAcademicFacultyInToDB,
  getSingleAcademicFacultyInToDB,
  updateFacultyInToDB,
};
