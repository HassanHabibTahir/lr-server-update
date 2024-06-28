const httpStatus = require("http-status");
const { clientService } = require("../services");
const { getStoragePath } = require("../../helpers/storageUtil");
const { roles, Roles } = require("../../helpers/roles");

exports.createClient = async (req, res) => {
  try {
    const { email } = req.body;
    const isUserExist = await clientService.checkUserExist(email);
    if (isUserExist) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: "Email address already exists!" });
    }
    req.body.role=Roles.CLIENT          
    const user = await clientService.addUser(req.body);
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
    const { userId } = req.params;
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
