const httpStatus = require("http-status");
const { clientService, commonService } = require("../services");
const { getStoragePath } = require("../../helpers/storageUtil");
const { roles, Roles } = require("../../helpers/roles");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../services/admin.service");
exports.createClient = async (req, res) => {
  try {
    const body = req.body;
    const isUserExist = await commonService.checkUserExist(body?.email);
    if (isUserExist) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: "Email address already exists!" });
    }
    body.role = Roles.CLIENT;
    body.password = body?.contact;
    const user = await clientService.addClient(req.body);
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    console.error(`Catch Error: in add User => ${error}`);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
exports.getAllClient = async (req, res) => {
  try {
    const data = {
      role: Roles.CLIENT,
    };

    const users = await clientService.getAllClients(data);
    res.status(httpStatus.OK).send(users);
  } catch (error) {
    console.error(`Catch Error: in getAllUsers => ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await clientService.deleteUser(userId);
    if (!deletedUser) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }
    res.status(httpStatus.OK).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(`Catch Error: in deleteUser => ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {userId} = req?.tokenData ||{};
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
    const updateBody = {
      ...req.body,
    };

    if (profileImage) {
      updateBody.profileImage = profileImage;
    }
    const updatedUser = await clientService.updateProfile(userId, updateBody);
    res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};


exports.updatePassword = async (req, res) => {
  try { 
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
    const updatedUser = await clientService.updateProfile(userId, updateBody);
    res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    if (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
};