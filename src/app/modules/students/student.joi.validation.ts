import Joi from 'joi'

// Define Joi schemas for each subdocument
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .min(5)
    .max(20)
    .regex(/^[A-Z][a-z]*$/, 'capitalize format')
    .messages({
      'string.base': 'First Name must be a string',
      'string.empty': 'First Name is required!',
      'string.min': 'Name should be up to 5 characters',
      'string.max': 'First Name cannot be more than 20 characters',
      'string.pattern.name': '{#label} is not in capitalize format',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/, 'alpha characters')
    .messages({
      'string.base': 'Last Name must be a string',
      'string.empty': 'Last Name is required!',
      'string.pattern.name': '{#label} is not valid',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.base': 'Father Name must be a string',
    'string.empty': 'Father Name is required!',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.base': 'Father Occupation must be a string',
    'string.empty': 'Father Occupation is required!',
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.base': 'Father Contact Number must be a string',
    'string.empty': 'Father Contact Number is required!',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.base': 'Mother Name must be a string',
    'string.empty': 'Mother Name is required!',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.base': 'Mother Occupation must be a string',
    'string.empty': 'Mother Occupation is required!',
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.base': 'Mother Contact Number must be a string',
    'string.empty': 'Mother Contact Number is required!',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': 'Local Guardian Name must be a string',
    'string.empty': 'Local Guardian Name is required!',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.base': 'Local Guardian Occupation must be a string',
    'string.empty': 'Local Guardian Occupation is required!',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.base': 'Local Guardian Contact Number must be a string',
    'string.empty': 'Local Guardian Contact Number is required!',
  }),
  address: Joi.string().trim().required().messages({
    'string.base': 'Local Guardian Address must be a string',
    'string.empty': 'Local Guardian Address is required!',
  }),
});

// Define the main Student Joi schema
const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.base': 'Student ID must be a string',
    'string.empty': 'Student ID is required!',
  }),
  name: userNameValidationSchema.required().messages({
    'object.base': 'Student Name is required!',
  }),
  password: Joi.string().trim().required().messages({
    'string.empty': 'Password is required!',
  }),
  gender: Joi.string()
    .trim()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'string.base': 'Gender must be a string',
      'string.empty': 'Gender is required!',
      'any.only': '{#label} is not valid',
    }),
  email: Joi.string().trim().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required!',
    'string.email': '{#label} is not a valid email',
  }),
  dateOfBirth: Joi.string().trim().optional(),
  contactNumber: Joi.string().trim().required().messages({
    'string.base': 'Contact Number must be a string',
    'string.empty': 'Contact Number is required!',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.base': 'Emergency Contact Number must be a string',
    'string.empty': 'Emergency Contact Number is required!',
  }),
  bloodGroup: Joi.string()
    .trim()
    .valid('A+', 'A-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'string.base': 'Blood Group must be a string',
      'any.only': '{#label} is not valid',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.base': 'Present Address must be a string',
    'string.empty': 'Present Address is required!',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.base': 'Permanent Address must be a string',
    'string.empty': 'Permanent Address is required!',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian information is required!',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local Guardian information is required!',
  }),
  profileImage: Joi.string().trim().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'string.base': 'Status must be a string',
    'any.only': '{#label} is not valid',
  }),
});


export default studentValidationSchema