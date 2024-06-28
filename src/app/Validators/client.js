const { body, param } = require("express-validator");

exports.createClient = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),
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
  body("country")
    .notEmpty()
    .withMessage("Country is required")
    .isString()
    .withMessage("Country must be a string"),
  body("contactEmail")
    .notEmpty()
    .withMessage("Contact Email is required")
    .isEmail()
    .withMessage("Contact Email must be a valid email address"),
  body("imageURL")
    .optional()
    .isString()
    .withMessage("Image URL must be a string")
    .isURL()
    .withMessage("Image URL must be a valid URL"),
    body("jobType")
    .notEmpty()
    .withMessage("Job Type is required")
    .isIn(["monthly", "project-based"])
    .withMessage('Job Type must be either "monthly" or "project-based"'),
    body("clientSource")
      .notEmpty()
      .withMessage("Client Source is required")
      .isString()
      .withMessage("Client Source must be a string"),
       body().custom((value, { req }) => {
        const allowedFields = [
          "email",
          "password",
          "userName",
          "firstName",
          "lastName",
          "country",
          "contactEmail",
          "imageURL",
          "jobType",
          "clientSource"
        ];
      const unknownFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
      if (unknownFields.length > 0) {
        throw new Error(`This field is not allowed: ${unknownFields.join(', ')}`);
      }
      return true;
    }),
];

exports.updateProfile = [
  param("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
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
    body("country")
    .optional()
    .isString()
    .withMessage("Country must be a string"),
  body("contactEmail")
  .optional()
    .isEmail()
    .withMessage("Contact Email must be a valid email address"),
  body("profileImage")
    .optional()
    .custom((value, { req }) => {
      return true;
    })
    .withMessage("Invalid profile image"),
  body().custom((value, { req }) => {
    const allowedFields = ["firstName", "lastName", "profileImage","country","contactEmail"];
    const unknownFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field)
    );
    if (unknownFields.length > 0) {
      throw new Error(`This field is not allowed: ${unknownFields.join(", ")}`);
    }
    return true;
  }),
];

exports.deleteClient = [
  param("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
];