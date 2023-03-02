const OrderMongoDAO = require('./OrderMongoDAO');

const dbOption = process.env.dbOption || 'MONGO';

switch (dbOption) {
  case 'MONGO':
    exports.OrderDAO = new OrderMongoDAO();
    break;
  default:
    exports.OrderDAO = new OrderMongoDAO();
}
