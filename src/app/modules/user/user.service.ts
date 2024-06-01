import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { AppError } from '../../errors/AppErrors';
import httpStatus from 'http-status';

const createStudentInToDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not given , use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  const admissionSemesterId = new mongoose.Types.ObjectId(
    payload.admissionSemester,
  );
  const admissionSemester =
    await AcademicSemester.findById(admissionSemesterId);
  // find academic semester info
  // const admissionSemester = await AcademicSemester.findById(
  //   payload.admissionSemester,
  // );

  const session = await mongoose.startSession();
  if (admissionSemester === null) {
    return;
  }

  try {
    session.startTransaction();


    userData.id = await generateStudentId(admissionSemester);
    // create a user (transaction -1 )
    const newUser = await User.create([userData], { session }); //transaction use korar karone array hisabe kaj kore

    // create a student
    // if (Object.keys(newUser).length) bangla system
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user!', '');
    }

    // set id,_id, as user
    payload.user = newUser[0]._id; // reference id
    payload.id = newUser[0].id; // embaded id

    // create a student (transaction -2 )
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Failed to create student!',
        '',
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return newUser;
  } catch (err) {

    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create student',
      '',
    );
  }
};

export const UserServices = {
  createStudentInToDB,
};
