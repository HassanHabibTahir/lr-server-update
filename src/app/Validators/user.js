const { body, param } = require('express-validator');

exports.createUser = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string'),
  body('userName')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be a string'),
  body('firstName')
    .notEmpty()
    .withMessage('First Name is required')
    .isString()
    .withMessage('First Name must be a string'),
  body('lastName')
    .notEmpty()
    .withMessage('Last Name is required')
    .isString()
    .withMessage('Last Name must be a string'),
  body('contact')
    .notEmpty()
    .withMessage('Contact number is required')
    .isString()
    .withMessage('Contact number must be a string')
    .isLength({ min: 10, max: 15 })
    .withMessage('Contact number must be between 10 and 15 characters'),
//   body('profileImage')
//     .optional()
//     .isString()
//     .withMessage('Profile Image URL must be a string')
//     .trim()
//     .isURL()
//     .withMessage('Profile Image URL must be a valid URL'),
//   body('typeRole')
//     .notEmpty()
//     .withMessage('Type Role is required')
//     .isString()
//     .withMessage('Type Role must be a string'),
  body('jobType')
    .notEmpty()
    .withMessage('Job Type is required')
    .isIn(['monthly', 'project-based'])
    .withMessage('Job Type must be either "monthly" or "project-based"'),
];


exports.deleteUser=[
  param("userId")
   .notEmpty()
   .withMessage("User ID is required")
   .isMongoId()
   .withMessage("Invalid user ID"),
]