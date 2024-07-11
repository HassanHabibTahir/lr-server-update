const express = require("express");
const { taskController } = require("../app/Controllers");
const taskValidator = require("../app/Validators/task");
const commonValidators = require("../app/Validators/commonValidators");
const { Admin } = require("../app/Middleware/user");
const router = express.Router();
// admin,
const errorMsgs = commonValidators.responseValidationResults;
router.post("/create",Admin, [taskValidator.createTask,errorMsgs], taskController.createTask)
router.put("/assign/:id",Admin, [taskValidator.assign,errorMsgs],taskController.assignTask);
router.put("/progress/:id",Admin, [taskValidator.progress,errorMsgs],taskController.updateProgress)
router.put("/update/:id",Admin,[taskValidator.update, errorMsgs],taskController.updateTask);
router.put("/estimation/:id",Admin, [taskValidator.estimation,errorMsgs],taskController.updateEstimation)
router.delete("/delete/:id",Admin,[taskValidator.id,errorMsgs], taskController.deleteTask)
router.get("/", taskController.getTasks)

router.get("/:id",[taskValidator.id,errorMsgs], taskController.getTaskById)


module.exports = router;