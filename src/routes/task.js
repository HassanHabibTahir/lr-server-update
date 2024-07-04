const express = require("express");
const { taskController } = require("../app/Controllers");
const taskValidator = require("../app/Validators/task");
const admin = require("../app/Middleware/admin");
const commonValidators = require("../app/Validators/commonValidators");
const router = express.Router();
// admin,
const errorMsgs = commonValidators.responseValidationResults;
router.post("/create", [taskValidator.createTask,errorMsgs], taskController.createTask)
router.put("/assign/:id", [taskValidator.assign,errorMsgs],taskController.assignTask);
router.put("/progress/:id", [taskValidator.progress,errorMsgs],taskController.updateProgress)
router.put("/update/:id",[taskValidator.update, errorMsgs],taskController.updateTask);
router.put("/estimation/:id", [taskValidator.estimation,errorMsgs],taskController.updateEstimation)
router.delete("/delete/:id",[taskValidator.id,errorMsgs], taskController.deleteTask)
router.get("/", taskController.getTasks)

router.get("/:id",[taskValidator.id,errorMsgs], taskController.getTaskById)


module.exports = router;