const {body} = require("express-validator");
exports.login = [
    body("email").notEmpty().isString(),
    body("password").notEmpty().isString(),
  ];