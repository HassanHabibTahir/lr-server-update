const express = require("express");
const router = express.Router();
const { userController } = require("../app/Controllers");
const userValidator = require("../app/Validators/user");
const commonValidators = require("../app/Validators/commonValidators");
const { Admin, User } = require("../app/Middleware/user");
const errorMsgs = commonValidators.responseValidationResults;

router.post(
  "/create",
  [userValidator.createUser, errorMsgs],
  Admin,
  userController.createUser
);

router.get("/getAll", userController.getAllUsers);

router.delete(
  "/delete/:userId",
  [userValidator.deleteUser],
  Admin,
  userController.deleteUser
);

router.put(
  "/update",
  [userValidator.updateProfile, errorMsgs],
  User,
  userController.updateProfile
);

router.put(
  "/block-user/:userId",
  [userValidator.deactivateUser, errorMsgs],
  Admin,
  userController.blockActivateUser
);

module.exports = router;
