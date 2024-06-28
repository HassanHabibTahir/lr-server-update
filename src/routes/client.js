const express = require("express");
const router = express.Router();

const clientValidator = require("../app/Validators/client");
const commonValidators = require("../app/Validators/commonValidators");
const admin = require("../app/Middleware/admin");
const client = require("../app/Middleware/client");

const { clientController } = require("../app/Controllers");
const errorMsgs = commonValidators.responseValidationResults;
router.post(
  "/create",
  [clientValidator.createClient, errorMsgs],
  admin,
  clientController.createClient
);
router.get("/allClients", clientController.getAllClient);
router.delete(
  "/delete/:userId",
  [clientValidator.deleteClient],
  admin,
  clientController.deleteClient
);

router.put(
  "/update/:userId",
  [clientValidator.updateProfile, errorMsgs],
  client,
  clientController.updateProfile
);
module.exports = router;
