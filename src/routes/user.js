const express = require("express");
const router = express.Router();
const { userController } = require("../app/Controllers");
const userValidator = require("../app/Validators/user");
const commonValidators = require("../app/Validators/commonValidators");
const errorMsgs = commonValidators.responseValidationResults;
const admin = require("../app/Middleware/admin");
router.post(
  "/create",
  [userValidator.createUser, errorMsgs],
  admin,
  userController.createUser
);

router.get("/getAll", userController.getAllUsers);

router.delete(
  "/delete/:userId",
  [userValidator.deleteUser],
  admin,
  userController.deleteUser
);

// router.post("update",[],userController.updateProfile)

module.exports = router;
