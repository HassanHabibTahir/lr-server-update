const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Models
const { User } = require("../Models/users");
const generator = require("generate-password");
// Helpers
const authHelper = require("../../helpers/auth_helpers");
const httpStatus = require("http-status");
const { adminService } = require("../services");
const path = require("path");
const { getStoragePath } = require("../../helpers/storageUtil");
const { validationResult } = require("express-validator");
const { hashPassword } = require("../services/admin.service");
//Managers

// ************ SIGN UP ************ //
exports.signup = async (req, res) => {
  try {
    const { email } = req.body;
    const isUserExist = await adminService.checkUserExist(email);
    if (isUserExist) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: "Email address already exists!" });
    }
    const user = await adminService.singUp(req.body);
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    console.error(`Catch Error: in user signup => ${error}`);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// ************ LOGIN ************ //
exports.login = async function (req, res) {
  try {
    const { password, email } = req.body;
    const user = await adminService.checkUserExist(email);
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
    let loginInfo = await authHelper.generateLoginInfo(userData);
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

exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { userName } = req.body;
    let profileImage;
    let storagePath;
    if (req?.files?.profileImage) {
      storagePath = getStoragePath(req?.files?.profileImage);
    }
    if (req.files && req.files.profileImage) {
      const file = req.files.profileImage;
      await file.mv(storagePath);
      profileImage = storagePath;
    }
    const updateBody = {};
    if (userName) {
      updateBody.userName = userName;
    }
    if (profileImage) {
      updateBody.profileImage = profileImage;
    }
    if (userName && profileImage) {
      updateBody.userName = userName;
      updateBody.profileImage = profileImage;
    }
    const updatedUser = await adminService.updateProfile(userId, updateBody);
    res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    console.log(error, "error");
    if (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;
    const user = await adminService.checkUserById(userId);
    if (!user) {
      return res.status(400).send({
        message: `Invalid  password`,
      });
    }
    let isMatched = await user.isPasswordMatch(oldPassword);
    console.log(isMatched, "iMatch");
    if (!isMatched) {
      return res.status(400).send({
        message: `Invalid password`,
      });
    }
    const updateBody = {};
    if (newPassword) {
      updateBody.password = await hashPassword(newPassword);
    }
    const updatedUser = await adminService.updatePassword(userId, updateBody);
    res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    if (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
       .status(httpStatus.BAD_REQUEST)
       .json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const user = await adminService.checkUserById(userId);
    if (!user) {
      return res.status(400).send({
        message: `Invalid  password`,
      });
    }
    const updateBody = {};
    updateBody.isDeleted = 1;
    const updatedUser = await adminService.updateProfile(userId, updateBody);
    res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    if (error) {
      return res
       .status(httpStatus.INTERNAL_SERVER_ERROR)
       .json({ message: error.message });
    }
  }
}