const { body, param } = require("express-validator");
const { default: mongoose } = require("mongoose");

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
    .isIn([
      "In-Discussion",
      "Approved",
      "In-Development",
      "Review",
      "Completed",
    ])
    .withMessage(
      "Status must be one of: In-Discussion, Approved, In-Development, Review, Completed"
    ),
  body("priority")
    .notEmpty()
    .withMessage("Priority is required")
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be one of: Low, Medium, High"),
  body("clientId")
    .notEmpty()
    .withMessage("Client ID is required")
    .isMongoId()
    .withMessage("Invalid Client ID"),
  body("notes").optional().isString().withMessage("Invalid Additional notes"),
  body("startDate")
    .optional()
    .isString()
    .withMessage("Start Date must be a valid date"),
  body("completeDate")
    .optional()
    .isString()
    .withMessage("Complete Date must be a valid date"),
  body("approveDate")
    .optional()
    .isString()
    .withMessage("Approve Date must be a valid date"),

  body().custom((value, { req }) => {
    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "clientId",
      "notes",
      "startDate",
      "completeDate",
      "approveDate",
      "files",
      "assignedTo",
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

exports.updateProject = [
  param("id")
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
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be one of: Low, Medium, High"),
  body("clientId").optional().isMongoId().withMessage("Invalid Client ID"),
  body("notes").optional().isString().withMessage("Invalid Additional notes"),
  body("startDate")
    .optional()
    .isString()
    .withMessage("Start Date must be a valid date"),
  body("completeDate")
    .optional()
    .isString()
    .withMessage("Complete Date must be a valid date"),
  body("approveDate")
    .optional()
    .isString()
    .withMessage("Approve Date must be a valid date"),

  body("status")
    .optional()
    .isIn([
      "In-Discussion",
      "Approved",
      "In-Development",
      "Review",
      "Completed",
    ])
    .withMessage(
      "Status must be one of: In-Discussion, Approved, In-Development, Review, Completed"
    ),

  body().custom((value, { req }) => {
    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "clientId",
      "notes",
      "startDate",
      "completeDate",
      "approveDate",
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

exports.addComments = [
  param("id")
    .notEmpty()
    .withMessage("Project ID is required")
    .isMongoId()
    .withMessage("Invalid Project ID"),
  body("text")
    .notEmpty()
    .withMessage("Text is required")
    .isString()
    .withMessage("Text must be a string"),
],
exports.ID = [
  param('id')
    .notEmpty()
    .withMessage('Project ID is required')
    .isMongoId()
    .withMessage('Invalid Project ID'),
];

exports.addFiles = [
  param('id')
    .notEmpty()
    .withMessage('Project ID is required')
    .isMongoId()
    .withMessage('Invalid Project ID'),
  body('files')
    .custom((value, { req }) => {
      if (!req.files || !req.files.files) {
        throw new Error('No files uploaded');
      }

      let files = req.files.files;
      if (!Array.isArray(files)) {
        files = [files]; 
      }
      if (files.length === 0) {
        throw new Error('Files must contain at least one file');
      }
      return true; 
    })
    .withMessage('files must be a non-empty array'),
];
exports.assign = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required")
    .isMongoId()
    .withMessage("Invalid Task ID"),
  body("assignedTo")
    .isArray({ min: 1 })
    .withMessage("assignedTo must be a non-empty array")
    .custom((array) => {
      if (!array.every(id => mongoose.Types.ObjectId.isValid(id))) {
        throw new Error("All assignedTo elements must be valid Mongo IDs");
      }
      return true;
    })
];