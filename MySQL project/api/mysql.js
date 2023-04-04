const mysql = require('mysql2/promise');
const config = require('./config');
let connection = null;

module.exports = {
  connect: async () => {
     return connection = await mysql.createConnection(config.dataBaseOptions);
  },
  getConnection: () => connection,
};