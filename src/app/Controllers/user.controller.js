const httpStatus = require("http-status");
const { userService } = require("../services");

exports.createUser = async (req, res) => {
   try{
    console.log(req.body);
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
      const users = await userService.getAllUsers();
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
      const { id } = req.params;
      console.log(id,"id")
      // const deletedUser = await userService.deleteUser(id);
      // if (!deletedUser) {
      //   return res
      //     .status(httpStatus.NOT_FOUND)
      //     .json({ message: "User not found" });
      // }
      res.status(httpStatus.OK).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(`Catch Error: in deleteUser => ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error", error: error.message });
    }
  };


  exports.updateProfile = async (req, res) => {
    try{}catch(error){
        return res
         .status(httpStatus.INTERNAL_SERVER_ERROR)
         .json({ message: "Internal server error", error: error.message });
    }
  }




  exports.blockActivateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      const updatedUser = await userService.blockActivateUser(id, isActive);
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