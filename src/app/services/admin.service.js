const { User } = require("../Models/users");
const bcrypt = require('bcrypt');
const checkUserExist = async (email) => {
  const userExist = await User.findOne({ email: email });
  return userExist;
};
const checkUserById = async (id) => {
  const userExist = await User.findById({ _id: id });
  return userExist;
};

async function hashPassword(password) {
      const hashedPassword = await bcrypt.hash(password, 8);
      return hashedPassword;
}

const singUp = async (userBody) => {
  const userCount = await User.countDocuments();
  userBody.role = "admin";
  return User.create(userBody);
};

const updateProfile = async (userId,userBody) => {
  const updatedUser = await User.findByIdAndUpdate(userId, userBody, {
    new: true,
  });
  return updatedUser;
};

const updatePassword = async (userId,userBody) => {
  const updatedUser = await User.findByIdAndUpdate(userId, userBody, {
    new: true,
  });
  return updatedUser;
};



module.exports = {
  singUp,
  checkUserExist,
  updateProfile,
  hashPassword,
  checkUserById,
  updatePassword
};
