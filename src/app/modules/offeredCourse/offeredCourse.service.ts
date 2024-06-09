import { TOfferedCourse } from "./offeredCourse.interface"
import { OfferedCourse } from "./offeredCourse.model"

const createOfferedCourseInToDB = async (payload:Partial<TOfferedCourse>) => {
    
    const result = await OfferedCourse.create(payload)
    return result
}

const getAllOfferedCourseInToDB = async () => {
    const result = await OfferedCourse.find()
    return result
}

const getSingleOfferedCounrInToDB = async (id: string) => {
    const result = await OfferedCourse.findById(id)
    return result
}
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