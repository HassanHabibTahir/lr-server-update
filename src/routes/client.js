const express = require("express");
const router = express.Router();

const clientValidator = require("../app/Validators/client");
const commonValidators = require("../app/Validators/commonValidators");

const { clientController } = require("../app/Controllers");
const { Admin, Client, AdminOrSuperAdmin, AdminOrSuperAdminOrClient } = require("../app/Middleware/user");
const errorMsgs = commonValidators.responseValidationResults;
router.post(
  "/create",
  [clientValidator.createClient, errorMsgs],
  AdminOrSuperAdmin,
  clientController.createClient
);
router.get("/allClients",AdminOrSuperAdmin, clientController.getAllClient);
router.get(
  "/:id",
  [clientValidator.clientId, errorMsgs],
  AdminOrSuperAdmin,
  clientController.getClientById
);
router.delete(
  "/delete/:id",
  [clientValidator.clientId, errorMsgs],
  AdminOrSuperAdmin,
  clientController.deleteClient
);

router.put(
  "/updatePassword/:id",
  [clientValidator.updatePassword, errorMsgs],
  AdminOrSuperAdminOrClient,
  clientController.updatePassword
);

router.put(
  "/update/:id",
  [clientValidator.updateProfile, errorMsgs],
  AdminOrSuperAdmin,
  clientController.updateProfile
);
module.exports = router;
