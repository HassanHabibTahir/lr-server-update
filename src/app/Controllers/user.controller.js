const httpStatus = require("http-status");
const { userService } = require("../services");
const { getStoragePath } = require("../../helpers/storageUtil");
const { Roles } = require("../../helpers/roles");

exports.createUser = async (req, res) => {
   try{
   
    const { email } = req.body;
    const isUserExist = await userService.checkUserExist(email);
    if (isUserExist) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: "Email address already exists!" });
    }
    const user = await userService.addUser(req.body);
    res.status(httpStatus.CREATED).send(user);
} catch (error) {
  console.error(`Catch Error: in add User => ${error}`);
  return res
    .status(500)
    .json({ message: "Internal server error", error: error.message });
}
}

exports.getAllUsers = async (req, res) => {
    try {
      let data = {
        role:Roles.USER
      }
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
      res.status(httpStatus.OK).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(`Catch Error: in deleteUser => ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error", error: error.message });
    }
  };


  exports.updateProfile = async (req, res) => {
    try{
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
      const updatedUser = await userService.updateProfile(userId, updateBody);
      res.status(httpStatus.OK).json(updatedUser);

    }catch(error){
        return res
         .status(httpStatus.INTERNAL_SERVER_ERROR)
         .json({ message: "Internal server error", error: error.message });
    }
  }




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