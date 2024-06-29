const { body, param } = require("express-validator");

exports.createProject = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isString()
    .withMessage("Status must be a string"),
  body().custom((value, { req }) => {
    const allowedFields = ["title", "description", "status"];
    const unknownFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (unknownFields.length > 0) {
      throw new Error(`This field is not allowed: ${unknownFields.join(', ')}`);
    }
    return true;
  }),
];


exports.updateProject = [
    param("projectId")
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),
    body("title")
      .optional()
      .isString()
      .isLength({ min: 3 })
      .withMessage("Title must be a string with at least 3 characters"),
    body("description")
      .optional()
      .isString()
      .isLength({ min: 3 })
      .withMessage("Description must be a string with at least 3 characters"),
    body("status")
      .optional()
      .isString()
      .withMessage("Status must be a string"),
    body().custom((value, { req }) => {
      const allowedFields = ["title", "description", "status"];
      const unknownFields = Object.keys(req.body).filter(
        (field) => !allowedFields.includes(field)
      );
      if (unknownFields.length > 0) {
        throw new Error(`This field is not allowed: ${unknownFields.join(", ")}`);
      }
      return true;
    }),
  ];
  
  exports.deleteProject = [
    param("projectId")
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),
  ];
  