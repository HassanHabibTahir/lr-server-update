const express = require("express");
const { taskController } = require("../app/Controllers");
const taskValidator = require("../app/Validators/task");
const commonValidators = require("../app/Validators/commonValidators");
const { AdminOrSuperAdmin, AdminOrSuperAdminOrEmployee } = require("../app/Middleware/user");
const router = express.Router();
// admin,
const errorMsgs = commonValidators.responseValidationResults;
router.post("/create",AdminOrSuperAdmin, [taskValidator.createTask,errorMsgs], taskController.createTask)
router.put("/assign/:id",AdminOrSuperAdmin, [taskValidator.assign,errorMsgs],taskController.assignTask);
router.put("/progress/:id",AdminOrSuperAdmin, [taskValidator.progress,errorMsgs],taskController.updateProgress)
router.put("/update/:id",AdminOrSuperAdmin,[taskValidator.update, errorMsgs],taskController.updateTask);
router.put("/estimation/:id",AdminOrSuperAdmin, [taskValidator.estimation,errorMsgs],taskController.updateEstimation)
router.delete("/delete/:id",AdminOrSuperAdmin,[taskValidator.id,errorMsgs], taskController.deleteTask)
router.get("/", taskController.getTasks)
router.get("/:id",[taskValidator.id,errorMsgs], taskController.getTaskById)
router.post("/add-comment/:id",AdminOrSuperAdminOrEmployee,[taskValidator.addComments, errorMsgs],taskController.addComment);
router.put("/updateStatus/:id",AdminOrSuperAdminOrEmployee,taskController?.updateStatus);
router.put("/addFiles/:id",AdminOrSuperAdmin,[taskValidator.addFiles,errorMsgs],taskController.addTaskFiles)
// add attacthments 





module.exports = router;