require("dotenv").config();
const jwt = require("jsonwebtoken");
const constants = require("../../app/Constants/app.constants"); // Adjust the path as necessary
const { userService } = require("../services");
const app_constants = require("../../../config/constants");
const { Roles } = require("../../helpers/roles");

const validateToken = (requiredRoles) => {
  return async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
      return res.status(401).send("Access denied. Invalid token provided.");

    try {
      const { data } = jwt.verify(token, app_constants.APP_SECRET);
      const user = await userService.getUserInfo(data.userId);

      if (!user || !requiredRoles.includes(user.role)) {
        return res
          .status(401)
          .send("Access denied. Access level not authorized.");
      }

      req.tokenData = data;
      next();
    } catch (ex) {
      console.log(ex);
      return res.status(401).send("Access denied. No token provided.");
    }
  };
};

module.exports = {
  Admin: validateToken([Roles.ADMIN]),
  Client: validateToken([Roles.CLIENT]),
  User: validateToken([Roles.USER]),
  SuperAdmin: validateToken([Roles.SuperAdmin]),
  AdminOrSuperAdmin: validateToken([Roles.ADMIN, Roles.SuperAdmin]),
  AdminOrSuperAdminOrClient: validateToken([
    Roles.ADMIN,
    Roles.SuperAdmin,
    Roles.CLIENT,
  ]),
  AdminOrSuperAdminOrEmployee: validateToken([
    Roles.ADMIN,
    Roles.SuperAdmin,
    Roles.USER,
  ]),
  AdminOrSuperAdminOrEmployeeOrClient: validateToken([
    Roles.ADMIN,
    Roles.SUPERADMIN,
    Roles.USER,
    Roles.CLIENT,
  ]),
};
