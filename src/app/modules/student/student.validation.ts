import { z } from 'zod';

// Define Zod schemas for each subdocument
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(5, 'Name should be up to 5 characters')
    .max(20, 'First Name cannot be more than 20 characters')
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'First Name is not in capitalize format',
    }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must contain only alphabetic characters',
    }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father Name is required!'),
  fatherOccupation: z.string().trim().min(1, 'Father Occupation is required!'),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, 'Father Contact Number is required!'),
  motherName: z.string().trim().min(1, 'Mother Name is required!'),
  motherOccupation: z.string().trim().min(1, 'Mother Occupation is required!'),
  motherContactNo: z
    .string()
    .trim()
    .min(1, 'Mother Contact Number is required!'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, 'Local Guardian Name is required!'),
  occupation: z
    .string()
    .trim()
    .min(1, 'Local Guardian Occupation is required!'),
  contactNo: z
    .string()
    .trim()
    .min(1, 'Local Guardian Contact Number is required!'),
  address: z.string().trim().min(1, 'Local Guardian Address is required!'),
});

// Define the main Student Zod schema
const studentValidationSchema = z.object({
  id: z.string().trim().min(1, 'Student ID is required!'),
  name: userNameValidationSchema,
  password: z.string().trim().min(8, 'Password is required!').max(20),
  gender: z
    .enum(['male', 'female', 'other'])
    .refine((value) => ['male', 'female', 'other'].includes(value), {
      message: 'Gender is not valid',
    }),
  email: z
    .string()
    .trim()
    .email('Email is not valid')
    .min(1, 'Email is required!'),
  dateOfBirth: z.string().optional(),
  contactNumber: z.string().trim().min(1, 'Contact Number is required!'),
  emergencyContactNo: z
    .string()
    .trim()
    .min(1, 'Emergency Contact Number is required!'),
  bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().trim().min(1, 'Present Address is required!'),
  permanentAddress: z.string().trim().min(1, 'Permanent Address is required!'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().trim().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  // isDeleted: z.boolean(),
});

export default studentValidationSchema;
