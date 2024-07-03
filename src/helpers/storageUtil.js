const fs = require('fs');
const path = require('path');
const os = require('os');
// const getStoragePath = (file) => {
//   const storagePath = path.join(__dirname, '../', '/storage/images',JSON.stringify(file?.name)); 

//   // // Ensure the storage path directory exists
//   // if (!fs.existsSync(storagePath)){
//   //   fs.mkdirSync(storagePath, { recursive: true });
//   // }

//   return storagePath;
// };
const getStoragePath = (file) => {
  const tempDir = os.tmpdir();
  const storagePath = path.join(tempDir, file.name);
  return storagePath;
};
module.exports = {
  getStoragePath,
};
