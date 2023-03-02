const userMongoDAO = require('./userMongoDAO.js');

const dbOption = process.env.dbOption || 'MONGO';

switch (dbOption) {
  case 'MONGO':
    exports.userDAO = new userMongoDAO();
    break;
  default:
    exports.userDAO = new userMongoDAO();
}
