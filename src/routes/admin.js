// Libraries
const express = require("express");
const router = express.Router();

//***************** Controllers **********************/
// const usersController = require('../app/Controllers/admin.controller');

//***************** Validations **********************/
const commonValidators = require("../app/Validators/commonValidators");
const adminValidator = require("../app/Validators/admin");
const { adminController } = require("../app/Controllers");
const admin = require("../app/Middleware/admin");

const errorMsgs = commonValidators.responseValidationResults;
router.post(
  "/signup",
  [adminValidator.signup, errorMsgs],
  adminController.signup
);
router.put(
  "/update",
  [adminValidator.updateProfile, errorMsgs],
  admin,
  adminController.updateProfile
);
router.put(
  "/updatePassword",
  [adminValidator.updatePassword, errorMsgs],
  admin,
  adminController.updatePassword
);
router.put(
  "/delete",
  admin,
  adminController.deleteAdmin
);

module.exports = router;
