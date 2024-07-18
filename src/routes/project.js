const express = require("express");
const router = express.Router();

const projectValidator = require("../app/Validators/project");
const commonValidators = require("../app/Validators/commonValidators");

const { projectController } = require("../app/Controllers");
const { Admin } = require("../app/Middleware/user");
const errorMsgs = commonValidators.responseValidationResults;
router.post(
  "/create",
  [projectValidator.createProject, errorMsgs],
  Admin,
  projectController.createProject
);
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getAllById),
router.delete(
  "/delete/:projectId",
  [projectValidator.deleteProject, errorMsgs],
  Admin,
  projectController.deleteProject
);

router.put(
  "/update/:projectId",
  [projectValidator.updateProject, errorMsgs],
  Admin,
  projectController.updateProject
);
module.exports = router;
