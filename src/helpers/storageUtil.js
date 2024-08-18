const fs = require('fs');
const path = require('path');
const os = require('os');
//development
// const getStoragePath = (file) => {
//   const storagePath = path.join(__dirname, '../', 'storage/files', file.name);
//   const directory = path.dirname(storagePath);
//   if (!fs.existsSync(directory)) {
//     fs.mkdirSync(directory, { recursive: true });
//   }

//   return storagePath;
// };
//production
const getStoragePath = (file) => {
  const tempDir = os.tmpdir();
  const storagePath = path.join(tempDir, file.name);
  return storagePath;
};
module.exports = {
  getStoragePath,
};
