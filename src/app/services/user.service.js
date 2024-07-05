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

const getAllUsers = async (data) => {
  return User.find(data);
};

const updateProfile = async (userId,userBody) => {
  const updatedUser = await User.findByIdAndUpdate(userId, userBody, {
    new: true,
  });
  if (!updatedUser) {
    return { error: `User with ID ${projectId} not found` };
  }
  return updatedUser;
};

const deleteUser = async (id,userBody) => {
  const deleteClient = await User.findByIdAndUpdate(id, userBody, {
    new: true,
  });
  if (!deleteClient) {
    return { error: `Client with ID ${id} not found` };
  }
  return deleteClient;
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
