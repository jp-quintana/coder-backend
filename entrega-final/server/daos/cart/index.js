const CartMongoDAO = require('./CartMongoDAO.js');
const CartFirebaseDAO = require('./CartFirebaseDAO.js');

const daoOption = process.env.daoOption || 'MONGO';

switch (daoOption) {
  case 'MONGO':
    exports.CartDAO = new CartMongoDAO();
    break;
  case 'FIREBASE':
    exports.CartDAO = new CartFirebaseDAO();
    break;
  default:
    exports.CartDAO = new CartMongoDAO();
}
