const OrderMongoDAO = require('./OrderMongoDAO');
const OrderFirebaseDAO = require('./OrderFirebaseDAO');

const daoOption = process.env.daoOption || 'MONGO';

switch (daoOption) {
  case 'MONGO':
    exports.OrderDAO = new OrderMongoDAO();
    break;
  case 'FIREBASE':
    exports.OrderDAO = new OrderFirebaseDAO();
    break;
  default:
    exports.OrderDAO = new OrderMongoDAO();
}
