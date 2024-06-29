const { User } = require("../Models/users");

const checkUserExist = async (email) => {
    const userExist = await User.findOne({ email: email });
    return userExist;
  };
  const checkUserById = async (id) => {
    const userExist = await User.findById({ _id: id });
    return userExist;
  };


  module.exports = {
    checkUserExist,
    checkUserById,
  }