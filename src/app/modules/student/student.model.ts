import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
  StudentModel,
} from './student.interface';

// 2. Create a Schema corresponding to the document interface.
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required!'],
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 characters'],
    minlength: [5, 'Name should up to 5 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required!'],
    // validate: {
    //   validator:(value:string)=>validator.isAlpha(value),message:'{VALUE} is not validate'
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required!'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father Occupation is required!'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father Contact Number is required!'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother Name is required!'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother Occupation is required!'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother Contact Number is required!'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Name is required!'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Occupation is required!'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Contact Number is required!'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Address is required!'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      trim: true,
      required: [true, 'Student ID is required!'],
      unique: true,
      ref: 'User',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required!'],
      unique: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student Name is required!'],
    },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: [true, 'Gender is required!'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required!'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    dateOfBirth: { type: String },
    contactNumber: {
      type: String,
      trim: true,
      required: [true, 'Contact Number is required!'],
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, 'Emergency Contact Number is required!'],
    },
    bloodGroup: {
      type: String,
      trim: true,
      enum: ['A+', 'A-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present Address is required!'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent Address is required!'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required!'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian information is required!'],
    },
    profileImage: { type: String, trim: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

/// query middlewear
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// craeting a custom static method
studentSchema.statics.isStudentExists = async (id: string) => {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

// creating a custom instance method

// studentSchema.methods.isUserExists = async (id: string) => {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
