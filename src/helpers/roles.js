// USE IN MODULE AND CONDITIONS
const allRoles = {
    user: [],
    admin: ['getUsers', 'manageUsers'],
    superAdmin:[],
    client:[]
  };
  // use ENUM
  const Roles = {
    ADMIN: 'admin',
    SuperAdmin: 'superAdmin',
    USER: 'user',
    CLIENT: 'client',
    
  }
  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));

  module.exports = {
    roles,
    roleRights,
    Roles
  };
  