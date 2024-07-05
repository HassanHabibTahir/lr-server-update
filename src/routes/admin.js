// Libraries
const express = require("express");
const router = express.Router();

//***************** Controllers **********************/
// const usersController = require('../app/Controllers/admin.controller');

//***************** Validations **********************/
const commonValidators = require("../app/Validators/commonValidators");
const adminValidator = require("../app/Validators/admin");
const { adminController } = require("../app/Controllers");
const { Admin } = require("../app/Middleware/user");

const errorMsgs = commonValidators.responseValidationResults;
router.post(
  "/signup",
  [adminValidator.signup, errorMsgs],
  adminController.signup
);
router.put(
  "/update",
  [adminValidator.updateProfile, errorMsgs],
  Admin,
  adminController.updateProfile
);
router.put(
  "/updatePassword",
  [adminValidator.updatePassword, errorMsgs],
  Admin,
  adminController.updatePassword
);
router.put(
  "/delete/:id",
  [adminValidator.deleteAdmin, errorMsgs],
  Admin,
  adminController.deleteAdmin
);

module.exports = router;
