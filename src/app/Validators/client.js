const { body, param } = require("express-validator");

exports.createClient = [
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

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("contact")
    .notEmpty()
    .isMobilePhone()
    .isString()
    .withMessage('Contact must be a valid phone number'),

  body("country")
    .notEmpty()
    .withMessage("Country is required")
    .isString()
    .withMessage("Country must be a string"),

  body("clientType")
    .notEmpty()
    .withMessage("Job Type is required")
    .isIn(["monthly", "project-based"])
    .withMessage('Job Type must be either "monthly" or "project-based"'),

  body().custom((value, { req }) => {
    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "contact",
      "country",
      "clientType",
    ];
    const unknownFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field)
    );
    if (unknownFields.length > 0) {
      throw new Error(`This field is not allowed: ${unknownFields.join(", ")}`);
    }
    return true;
  }),
];

exports.updateProfile = [
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
  body("country").optional().isString().withMessage("Country must be a string"),
  body("contact")
  .optional()
  .isMobilePhone()
  .isString()
  .withMessage('Contact must be a valid phone number'),
  body("profileImage")
    .optional()
    .custom((value, { req }) => {
      return true;
    })
    .withMessage("Invalid profile image"),
  body().custom((value, { req }) => {
    const allowedFields = [
      "firstName",
      "lastName",
      "profileImage",
      "country",
      "contact",
    ];
    const unknownFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field)
    );
    if (unknownFields.length > 0) {
      throw new Error(`This field is not allowed: ${unknownFields.join(", ")}`);
    }
    return true;
  }),
];

exports.clientId = [
  param("clientId")
    .notEmpty()
    .withMessage("Client ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
];

exports.updatePassword = [
  body("oldPassword")
    .notEmpty()
    // .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
    // .custom(passwordValidator),
  
  body("newPassword")
    .notEmpty()
    // .isLength({ min: 4 })
    .withMessage("Password must be at least 8 characters long")
    // .custom(passwordValidator),
  
];