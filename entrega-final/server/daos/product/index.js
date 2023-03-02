const ProductMongoDAO = require('./productMongoDAO');

const dbOption = process.env.dbOption || 'MONGO';

switch (dbOption) {
  case 'MONGO':
    exports.productDAO = new ProductMongoDAO();
    break;
  default:
    exports.productDAO = new ProductMongoDAO();
}
