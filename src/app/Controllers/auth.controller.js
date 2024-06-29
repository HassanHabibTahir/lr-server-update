const auth_helpers = require("../../helpers/auth_helpers");
const { commonService } = require("../services");

exports.login = async function (req, res) {
    try {
      const { password, email } = req.body;
      const user = await commonService.checkUserExist(email);
      if (!user) {
        return res.status(400).send({
          message: `Invalid Email Or password`,
        });
      }
      let isMatched = await user.isPasswordMatch(password);
      if (!isMatched) {
        return res.status(400).send({
          message: `Invalid password`,
        });
      }
      if (user.is_deleted == 1) {
        return res.status(400).json({
          message: `User no longer exits.`,
        });
      }
      user.last_login = new Date();
      await user.save();
      let userData = user.toJSON();
      let loginInfo = await auth_helpers.generateLoginInfo(userData);
      user.refreshToken = loginInfo.refreshToken;
  
      return res.send({
        message: "Logged in successfully.",
        token: loginInfo.accessToken,
        refreshToken: loginInfo.refreshToken,
        //   is_guest_user: false,
      });
    } catch (error) {
      console.log(`Catch Error: in login user => ${error}`);
      return res.send({
        status: false,
        message: "Error: Internal server error",
        error: error.message,
      });
    }
  };