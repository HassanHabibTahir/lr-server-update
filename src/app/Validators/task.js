const { body, param } = require("express-validator");

exports.createTask = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("projectId")
    .notEmpty()
    .withMessage("Project ID is required")
    .isMongoId()
    .withMessage("Project ID must be a valid Mongo ID"),
  body("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Assigned To must be a valid Mongo ID"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isString()
    .withMessage("Status must be a string"),
  body("estimation")
    .notEmpty()
    .withMessage("Estimation is required")
    .isNumeric()
    .withMessage("Estimation must be a number"),
  body("progress")
    .optional()
    .isNumeric()
    .withMessage("Progress must be a number"),
  body().custom((value, { req }) => {
    const allowedFields = [
      "name",
      "description",
      "projectId",
      "assignedTo",
      "status",
      "estimation",
      "progress",
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

exports.assign = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required")
    .isMongoId()
    .withMessage("Invalid Task ID"),
  body("assignedTo")
    .notEmpty()
    .withMessage("assignedTo is required")
    .isMongoId()
    .withMessage("Assigned To must be a valid Mongo ID"),
];

exports.progress = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required")
    .isMongoId()
    .withMessage("Invalid Task ID"),
  body("progress")
    .notEmpty()
    .withMessage("Progress is required")
    .isNumeric()
    .withMessage("Progress must be a number"),
];

exports.update = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required")
    .isMongoId()
    .withMessage("Invalid Task ID"),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("projectId")
    .optional()
    .isMongoId()
    .withMessage("Project ID must be a valid Mongo ID"),
  body("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Assigned To must be a valid Mongo ID"),
  body("status").optional().isString().withMessage("Status must be a string"),
  body("estimation")
    .optional()
    .isNumeric()
    .withMessage("Estimation must be a number"),
  body("progress")
    .optional()
    .isNumeric()
    .withMessage("Progress must be a number"),
  body().custom((value, { req }) => {
    const allowedFields = [
      "name",
      "description",
      "projectId",
      "assignedTo",
      "status",
      "estimation",
      "progress",
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
exports.estimation = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required")
    .isMongoId()
    .withMessage("Invalid Task ID"),
  body("estimation")
    .notEmpty()
    .withMessage("Estimation is required")
    .isNumeric()
    .withMessage("Estimation must be a number"),
];

exports.addComments = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required")
    .isMongoId()
    .withMessage("Invalid Task ID"),
    body("text")
    .notEmpty()
    .withMessage("Text is required")
    .isString()
    .withMessage("Text must be a string"),
];

exports.id = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required")
    .isMongoId()
    .withMessage("Invalid Task ID"),
];
