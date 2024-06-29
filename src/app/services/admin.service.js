const { Roles } = require("../../helpers/roles");
const { User } = require("../Models/users");
const bcrypt = require('bcrypt');


async function hashPassword(password) {
      const hashedPassword = await bcrypt.hash(password, 8);
      return hashedPassword;
}

const singUp = async (userBody) => {
  const userCount = await User.countDocuments();
  userBody.role = "admin";
  if (userCount === 0) {
    userBody.role = Roles.SuperAdmin;
  } else {
    userBody.role = Roles.ADMIN;
  }
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
  updateProfile,
  hashPassword,
  updatePassword
};
