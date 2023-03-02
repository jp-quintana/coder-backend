const CartMongoDAO = require('./CartMongoDAO.js');

const dbOption = process.env.dbOption || 'MONGO';

switch (dbOption) {
  case 'MONGO':
    exports.CartDAO = new CartMongoDAO();
    break;
  default:
    exports.CartDAO = new CartMongoDAO();
}
