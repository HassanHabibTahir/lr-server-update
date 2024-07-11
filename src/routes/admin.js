// Libraries
const express = require("express");
const router = express.Router();

//***************** Controllers **********************/
// const usersController = require('../app/Controllers/admin.controller');

//***************** Validations **********************/
const commonValidators = require("../app/Validators/commonValidators");
const adminValidator = require("../app/Validators/admin");
const { adminController } = require("../app/Controllers");
const { AdminOrSuperAdmin } = require("../app/Middleware/user");

const errorMsgs = commonValidators.responseValidationResults;
router.post(
  "/signup",
  [adminValidator.signup, errorMsgs],
  adminController.signup
);
router.put(
  "/update/:id",
  [adminValidator.updateProfile, errorMsgs],
  AdminOrSuperAdmin,
  adminController.updateProfile
);
router.put(
  "/updatePassword/:id",
  [adminValidator.updatePassword, errorMsgs],
  AdminOrSuperAdmin,
  adminController.updatePassword
);
router.put(
  "/delete/:id",
  [adminValidator.Id, errorMsgs],
  AdminOrSuperAdmin,
  adminController.deleteAdmin
);

module.exports = router;
