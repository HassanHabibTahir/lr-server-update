const { User } = require("../Models/users");
const bcrypt = require("bcrypt");

const checkUserExist = async (email) => {
  const userExist = await User.findOne({ email: email });
  return userExist;
};
const getUserInfo =  async (id) => {
  const user = await User.findById(id);
  return user ? user : false;
}

const addUser = async (body) => {
    return User.create(body);
  } 

const getAllUsers = async () => {
  return User.find({});
};

const updateProfile = async (userId,userBody) => {
  const updatedUser = await User.findByIdAndUpdate(userId, userBody, {
    new: true,
  });
  return updatedUser;
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

const blockActivateUser = async (userId,isActive) => {
  return User.findByIdAndUpdate(userId, { isActive: isActive }, { new: true });

};

module.exports = {
  checkUserExist,
  addUser,
  getAllUsers,
  updateProfile,
  deleteUser,
  blockActivateUser,
  getUserInfo
 
};
