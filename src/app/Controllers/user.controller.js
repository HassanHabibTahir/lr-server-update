const httpStatus = require("http-status");
const { userService, commonService } = require("../services");
const { getStoragePath } = require("../../helpers/storageUtil");
const { Roles } = require("../../helpers/roles");
const { hashPassword } = require("../services/admin.service");

exports.createUser = async (req, res) => {
  try {
    const body = req.body;
    const isUserExist = await userService.checkUserExist(body?.email);
    if (isUserExist) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: "Email address already exists!" });
    }
    body.role = Roles.USER;
    body.password = body?.contact;
    const user = await userService.addUser(body);
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    console.error(`Catch Error: in add User => ${error}`);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let data = {
      role: Roles.USER,
      isDeleted: 0,
    };
    const users = await userService.getAllUsers(data);
    res.status(httpStatus.OK).send(users);
  } catch (error) {
    console.error(`Catch Error: in getAllUsers => ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await userService.deleteUser(userId);
    if (!deletedUser) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }
    res
      .status(httpStatus.OK)
      .json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error(`Catch Error: in deleteUser => ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req?.params;
    // let profileImage;
    // let storagePath;
    // if (req?.files?.profileImage) {
    //   storagePath = getStoragePath(req?.files?.profileImage);
    // }
    // if (req.files && req.files.profileImage) {
    //   const file = req.files.profileImage;
    //   await file.mv(storagePath);
    //   profileImage = file?.name;
    // }
    const updateBody = {
      ...req.body,
    };
    // if (profileImage) {
    //   updateBody.profileImage = profileImage;
    // }
    const updatedUser = await userService.updateProfile(id, updateBody);
    res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.blockActivateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;
    const updatedUser = await userService.blockActivateUser(userId, isActive);
    if (!updatedUser) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }
    res.status(httpStatus.OK).send(updatedUser);
  } catch (error) {
    console.error(`Catch Error: in blockActivateUser => ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const { id } = req?.params || {};
    const { oldPassword, newPassword } = req.body;
    const user = await commonService.checkUserById(id);
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
    const updatedUser = await userService.updateProfile(id, updateBody);
    res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    if (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
};
