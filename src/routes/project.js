const express = require("express");
const router = express.Router();

const projectValidator = require("../app/Validators/project");
const commonValidators = require("../app/Validators/commonValidators");
const admin = require("../app/Middleware/admin");
const client = require("../app/Middleware/client");

const { projectController } = require("../app/Controllers");
const errorMsgs = commonValidators.responseValidationResults;
router.post(
  "/create",
  [projectValidator.createProject, errorMsgs],
  admin,
  projectController.createProject
);
router.get("/allProjects", projectController.getAllProjects);
router.delete(
  "/delete/:projectId",
  [projectValidator.deleteProject, errorMsgs],
  admin,
  projectController.deleteProject
);

router.put(
  "/update/:projectId",
  [projectValidator.updateProject, errorMsgs],
  admin,
  projectController.updateProject
);
module.exports = router;
