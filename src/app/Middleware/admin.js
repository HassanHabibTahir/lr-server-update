require("dotenv").config();
const jwt = require("jsonwebtoken");
const constants = require("../../app/Constants/app.constants");
const { userService } = require("../services");
const app_constants = require("../../../config/constants");



module.exports = async (req, res, next) => {
  const token = req.header(constants.ADMIN_TOKEN_NAME);
  if (!token)
    return res.status(401).send(`Access denied. Invalid token provided.`);

  try {
    const {data} = jwt.verify(token, app_constants.APP_SECRET);
    console.log(data, "decoded");
    const user = await userService.getUserInfo(data.userId);
    console.log(user, "user");
    if (user?.role !== "admin") {
      return res
        .status(401)
        .send(`Access denied. Access level not authorized.`);
    }

    req.tokenData = data;
    next();
  } catch (ex) {
    console.log(ex);
    return res.status(401).send(`Access denied. No token provided.`);
  }
};
