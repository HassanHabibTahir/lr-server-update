const express = require("express");
const router = express.Router();

const clientValidator = require("../app/Validators/client");
const commonValidators = require("../app/Validators/commonValidators");
const admin = require("../app/Middleware/admin");
const client = require("../app/Middleware/client");

const { clientController } = require("../app/Controllers");
const { Admin,Client } = require("../app/Middleware/user");
const errorMsgs = commonValidators.responseValidationResults;
router.post(
  "/create",
  [clientValidator.createClient, errorMsgs],
  Admin,
  clientController.createClient
);
router.get("/allClients", clientController.getAllClient);
router.delete(
  "/delete/:userId",
  [clientValidator.deleteClient],
  Admin,
  clientController.deleteClient
);


router.put(
  "/updatePassword",
  [clientValidator.updatePassword, errorMsgs],
  Client,
  clientController.updatePassword
);

router.put(
  "/update",
  [clientValidator.updateProfile, errorMsgs],
  Client,
  clientController.updateProfile
);
module.exports = router;
