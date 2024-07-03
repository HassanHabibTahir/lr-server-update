const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Models
const { User } = require("../Models/users");
const generator = require("generate-password");
// Helpers
const authHelper = require("../../helpers/auth_helpers");
const httpStatus = require("http-status");
const { adminService, commonService } = require("../services");

const path = require("path");
const { getStoragePath } = require("../../helpers/storageUtil");
const { validationResult } = require("express-validator");
const { hashPassword } = require("../services/admin.service");
const { Roles } = require("../../helpers/roles");
//Managers

// ************ SIGN UP ************ //
exports.signup = async (req, res) => {
  try {
    const { email } = req.body;
    const isUserExist = await commonService.checkUserExist(email);
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



exports.updateProfile = async (req, res) => {
  try {
    const user = req?.tokenData;
    const { userId } = user||{}
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    
    const { userName } = req.body;
    let profileImage;
    let storagePath;
    if (req?.files?.profileImage) {
      storagePath = getStoragePath(req?.files?.profileImage);
    }


    if (req.files && req.files.profileImage) {
      const file = req.files.profileImage;
      await file.mv(storagePath);
      profileImage = file?.name;
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
    const {userId} = req?.tokenData ||{};
   
    const { oldPassword, newPassword } = req.body;
    const user = await commonService.checkUserById(userId);
    if (!user) {
      return res.status(400).send({
        message: `Invalid  password`,
      });
    }
    let isMatched = await user.isPasswordMatch(oldPassword);
   
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
    const {userId} = req?.tokenData ||{};
    const user = await commonService.checkUserById(userId);
    
    if (!user) {
      return res.status(400).send({
        message: `User not found`,
      });
    }
    if (user.role !== Roles.SuperAdmin) {
      return res.status(400).send({
        message: `You are not a SuperAdmin, you can't delete an admin`,
      });
    }

    const updateBody = {};
    updateBody.isDeleted = req?.body?.isDeleted;
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