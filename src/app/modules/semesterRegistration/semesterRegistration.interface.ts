import { Date } from "mongoose";
import { Types } from "mongoose"

export type TSemesterRegistration = {
    academicSemester: Types.ObjectId;
    status: 'UPCOMING' | 'ONGOING' | 'ENDED';
    startDate: Date;
    endDate: Date;
    minCredit : number;
    maxCredit: number;
    createdAt: Date;
    updated:Date

}