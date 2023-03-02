const UserMongoDAO = require('./UserMongoDAO.js');

const dbOption = process.env.dbOption || 'MONGO';

switch (dbOption) {
  case 'MONGO':
    exports.UserDAO = new UserMongoDAO();
    break;
  default:
    exports.UserDAO = new UserMongoDAO();
}
