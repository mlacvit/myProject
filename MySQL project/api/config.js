const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  dataBaseOptions: {
    host: 'localhost',
    user: 'user',
    password: 'mlac',
    database: 'news',
  },
};