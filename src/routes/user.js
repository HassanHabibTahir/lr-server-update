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

router.get("/", userController.getAllUsers);
router.get("/:userId",[userValidator.userId, errorMsgs],userController.getUserById);

router.delete(
  "/delete/:userId",
  [userValidator.userId],
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
  [userValidator.userId, errorMsgs],
  Admin,
  userController.blockActivateUser
);

module.exports = router;
