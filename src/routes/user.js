const express = require("express");
const router = express.Router();
const { userController } = require("../app/Controllers");
const userValidator = require("../app/Validators/user");
const commonValidators = require("../app/Validators/commonValidators");
const errorMsgs = commonValidators.responseValidationResults;
const admin = require("../app/Middleware/admin");
const user = require("../app/Middleware/user");
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

router.put(
  "/update/:userId",
  [userValidator.updateProfile, errorMsgs],
  user,
  userController.updateProfile
);

router.put(
  "/block-user/:userId",
  [userValidator.deactivateUser, errorMsgs],
  admin,
  userController.blockActivateUser
);

module.exports = router;
