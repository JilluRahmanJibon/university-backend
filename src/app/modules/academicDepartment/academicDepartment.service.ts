import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmetnInToDB = async (payload: TAcademicDepartment) => {
  //   const isDepartmentExist = await AcademicDepartment.findOne({
  //     name: payload.name,
  //   });
  //   if (isDepartmentExist) {
  //     throw new Error('This Department is Already exist!');
  //   }
  const result = await AcademicDepartment.create(payload);
  return result;
};
const getAllAcademicDepartmentInToDb = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentInToDB = async (departmentId: string) => {
  const result = await AcademicDepartment.findById(departmentId).populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentInToDB = async (
  departmentId: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: departmentId },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmetnInToDB,
  getAllAcademicDepartmentInToDb,
  getSingleAcademicDepartmentInToDB,
  updateAcademicDepartmentInToDB,
};
