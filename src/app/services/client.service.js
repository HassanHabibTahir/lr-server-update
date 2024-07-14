const { User } = require("../Models/users");
const bcrypt = require("bcrypt");

const checkUserExist = async (email) => {
  const userExist = await User.findOne({ email: email });
  return userExist;
};
const getUserInfo = async (id) => {
  const user = await User.findById(id);
  return user ? user : false;
};

const addClient = async (body) => {
  return User.create(body);
};

const getAllClients = async (data) => {
  return User.find(data);
};
// get Client by ID

const getClientById = async (id) => {
  const client = await User.findById(id);
  return client? client : false;
};
const updateProfile = async (userId, userBody) => {
  const updatedUser = await User.findByIdAndUpdate(userId, userBody, {
    new: true,
  });
  if (!updatedUser) {
    return { error: `Client with ID ${projectId} not found` };
  }
  return updatedUser;
};

const deleteClient = async (id) => {
const client = await User.findById(id);
if (!client) {
  return { error: `Client with ID ${id} not found` };
}
const update = { isDeleted: true };

const deleteClient = await User.findByIdAndUpdate(id, update, {
  new: true,
});

return deleteClient;

};

module.exports = {
  checkUserExist,
  addClient,
  getAllClients,
  updateProfile,
  deleteClient,
  getUserInfo,
  getClientById
};
