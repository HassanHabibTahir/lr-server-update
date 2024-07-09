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

const deleteUser = async (id) => {
  const user = await User.findById(id);
if (!user) {
  return { error: `Client with ID ${id} not found` };
}
const update = { isDeleted: true };

const deleteUser = await User.findByIdAndUpdate(id, update, {
  new: true,
});

return deleteUser;
};

const blockActivateUser = async (userId,isActive) => {
  return User.findByIdAndUpdate(userId, { isActive: isActive }, { new: true });

};

// getUserById
const getUserById = async (id) => {
  const client = await User.findById(id);
  return client? client : false;
};

module.exports = {
  checkUserExist,
  addUser,
  getAllUsers,
  updateProfile,
  deleteUser,
  blockActivateUser,
  getUserInfo,
  getUserById
 
};
