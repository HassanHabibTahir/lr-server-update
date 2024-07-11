const express = require("express");
const router = express.Router();
const { userController } = require("../app/Controllers");
const userValidator = require("../app/Validators/user");
const commonValidators = require("../app/Validators/commonValidators");
const { Admin, User, AdminOrSuperAdmin, AdminOrSuperAdminOrEmployee } = require("../app/Middleware/user");
const errorMsgs = commonValidators.responseValidationResults;

router.post(
  "/create",
  [userValidator.createUser, errorMsgs],
  Admin,
  userController.createUser
);

router.get("/", userController.getAllUsers);
router.get("/:id",[userValidator.userId, errorMsgs],userController.getUserById);

router.delete(
  "/delete/:userId",
  [userValidator.userId],
  Admin,
  userController.deleteUser
);

router.put(
  "/update/:id",
  [userValidator.updateProfile, errorMsgs],
  AdminOrSuperAdmin,
  userController.updateProfile
);
router.put(
  "/updatePassword/:id",
  [userValidator.updatePassword, errorMsgs],
  AdminOrSuperAdminOrEmployee,
  userController.updatePassword
);
router.put(
  "/block-user/:userId",
  [userValidator.userId, errorMsgs],
  AdminOrSuperAdmin,
  userController.blockActivateUser
);

module.exports = router;
