const fs = require('fs');
const path = require('path');

const getStoragePath = (file) => {
  const storagePath = path.join(__dirname, '../', '/storage/images',file?.name); 

  // // Ensure the storage path directory exists
  // if (!fs.existsSync(storagePath)){
  //   fs.mkdirSync(storagePath, { recursive: true });
  // }

  return storagePath;
};

module.exports = {
  getStoragePath,
};
