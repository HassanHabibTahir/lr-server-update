const { body, param } = require("express-validator");

exports.createUser = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("userName")
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string"),
  body("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .isString()
    .withMessage("First Name must be a string"),
  body("lastName")
    .notEmpty()
    .withMessage("Last Name is required")
    .isString()
    .withMessage("Last Name must be a string"),
  body("contact")
    .notEmpty()
    .withMessage("Contact number is required")
    .isString()
    .withMessage("Contact number must be a string")
    .isLength({ min: 10, max: 15 })
    .withMessage("Contact number must be between 10 and 15 characters"),
  body("employeeType")
    .notEmpty()
    .withMessage("Employee Type is required")
    .isString()
    .withMessage('Job Type must be either "monthly" or "project-based"'),
];

exports.userId = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid sID"),
];

exports.updateProfile = [
  param("id")
  .notEmpty()
  .withMessage("ID is required")
  .isMongoId()
  .withMessage("Invalid ID"),
  body("firstName")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("userName must be a string with 3 to 6 characters"),
  body("lastName")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("userName must be a string with 3 to 6 characters"),

  body("profileImage")
    .optional()
    .custom((value, { req }) => {
      return true;
    })
    .withMessage("Invalid profile image"),
  body().custom((value, { req }) => {
    const allowedFields = ["firstName", "lastName", "contact", "profileImage"];
    const unknownFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field)
    );
    if (unknownFields.length > 0) {
      throw new Error(`This field is not allowed: ${unknownFields.join(", ")}`);
    }
    return true;
  }),
];
exports.updatePassword = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid ID"),
  body("oldPassword")
    .notEmpty()
    // .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  // .custom(passwordValidator),

  body("newPassword")
    .notEmpty()
    // .isLength({ min: 4 })
    .withMessage("Password must be at least 8 characters long"),
  // .custom(passwordValidator),
];
