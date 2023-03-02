const ProductMongoDAO = require('./ProductMongoDAO');

const dbOption = process.env.dbOption || 'MONGO';

switch (dbOption) {
  case 'MONGO':
    exports.ProductDAO = new ProductMongoDAO();
    break;
  default:
    exports.ProductDAO = new ProductMongoDAO();
}
