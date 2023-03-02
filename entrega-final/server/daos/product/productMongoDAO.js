const MongoClass = require('../base/MongoClass');
const ProductMongo = require('../../models/product/ProductMongo');

class ProductMongoDAO extends MongoClass {
  constructor() {
    super(ProductMongo);
  }
}

module.exports = ProductMongoDAO;
