const ProductMongoDAO = require('./ProductMongoDAO');
const ProductFirebaseDAO = require('./ProductFirebaseDAO');

const daoOption = process.env.daoOption || 'MONGO';

switch (daoOption) {
  case 'MONGO':
    exports.ProductDAO = new ProductMongoDAO();
    break;
  case 'FIREBASE':
    exports.ProductDAO = new ProductFirebaseDAO();
    break;
  default:
    exports.ProductDAO = new ProductMongoDAO();
}
