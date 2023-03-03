const UserMongoDAO = require('./UserMongoDAO.js');
const UserFirebaseDAO = require('./UserFirebaseDAO.js');

const daoOption = process.env.daoOption || 'MONGO';

switch (daoOption) {
  case 'MONGO':
    exports.UserDAO = new UserMongoDAO();
    break;
  case 'FIREBASE':
    exports.UserDAO = new UserFirebaseDAO();
    break;
  default:
    exports.UserDAO = new UserMongoDAO();
}
