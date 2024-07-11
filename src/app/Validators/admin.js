const { check, body, param, query } = require("express-validator");
const passwordValidator = (value) => {
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    throw new Error("Password must contain at least one letter and one number");
  }
  return true;
};

exports.signup = [
  body("userName")
    .notEmpty()
    .isString()
    .isLength({ min: 5 })
    .withMessage("userName must be a string with 5 to 6 characters"),
  body("email").notEmpty().isString(),
  body("password").notEmpty().isString(),
  body("profileImage").optional().isString().trim(),
];

exports.updateProfile = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
  body("userName")
    .optional()
    .isString()
    .isLength({ min: 5 })
    .withMessage("userName must be a string with 5 to 6 characters"),
];

exports.updateProfileImage = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
  body("profileImage")
    .optional()
    .custom((value, { req }) => {
      return true;
    })
    .withMessage("Invalid profile image"),
];

exports.updatePassword = [
  param("id")
  .notEmpty()
  .withMessage("ID is required")
  .isMongoId()
  .withMessage("Admin ID"),
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

exports.Id = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid ID"),
];
