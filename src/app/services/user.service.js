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

const editUser = async () => {
  if (updateBody.password) {
    updateBody.password = await bcrypt.hash(updateBody.password, 10);
  }
  return User.findByIdAndUpdate(id, updateBody, { new: true });
};

const deleteUser = async () => {
  return User.findByIdAndDelete(id);
};

const blockActivateUser = async () => {
  return User.findByIdAndUpdate(id, { isActive: isActive }, { new: true });

};

module.exports = {
  checkUserExist,
  addUser,
  getAllUsers,
  editUser,
  deleteUser,
  blockActivateUser,
  getUserInfo
 
};
