const CartMongoDao = require('./cartMongoDao.js');

const dbOption = process.env.dbOption || 'MONGO';

switch (dbOption) {
  case 'MONGO':
    exports.cartDAO = new CartMongoDao();
    break;
  default:
    exports.cartDAO = new CartMongoDao();
}
