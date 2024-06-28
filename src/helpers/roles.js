const allRoles = {
    user: [],
    admin: ['getUsers', 'manageUsers'],
    client:[]
  };
  const Roles = {
    USER: 'user',
    ADMIN: 'admin',
    CLIENT: 'client',
  }
  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));

  module.exports = {
    roles,
    roleRights,
    Roles
  };
  