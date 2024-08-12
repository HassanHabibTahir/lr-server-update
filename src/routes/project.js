const express = require("express");
const router = express.Router();

const projectValidator = require("../app/Validators/project");
const commonValidators = require("../app/Validators/commonValidators");

const { projectController } = require("../app/Controllers");
const {
  Admin,
  AdminOrSuperAdmin,
  AdminOrSuperAdminOrEmployee,
  AdminOrSuperAdminOrEmployeeOrClient,
} = require("../app/Middleware/user");
const errorMsgs = commonValidators.responseValidationResults;
router.post(
  "/create",
  [projectValidator.createProject, errorMsgs],
  AdminOrSuperAdmin,
  projectController.createProject
);
router.put("/addFiles/:id",[projectValidator.addFiles,errorMsgs],projectController.addProjectFiles)
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getAllById),
  router.delete(
    "/delete/:projectId",
    [projectValidator.ID, errorMsgs],
    AdminOrSuperAdmin,
    projectController.deleteProject
  );
router.put(
  "/update/:id",
  [projectValidator.updateProject, errorMsgs],
  AdminOrSuperAdmin,
  projectController.updateProject
);
// add comments to the project

router.post(
  "/add-comment/:id",
  AdminOrSuperAdminOrEmployee,
  [projectValidator.addComments, errorMsgs],
  projectController.addCommentSToProject
);

router.put("/assign/:id",AdminOrSuperAdmin, [projectValidator.assign,errorMsgs],projectController.assignProject);

module.exports = router;
