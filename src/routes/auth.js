const express = require("express");
const router = express.Router();
const authValidator = require("../app/Validators/auth");
const { authController } = require("../app/Controllers");
const commonValidators = require("../app/Validators/commonValidators");
const errorMsgs = commonValidators.responseValidationResults;
router.post('/login', [authValidator.login,errorMsgs],authController.login);
module.exports = router;