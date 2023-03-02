const MongoClass = require('../base/MongoClass');
const ProductMongo = require('../../models/productMongo');

class ProductMongoDAO extends MongoClass {
  constructor() {
    super(ProductMongo);
  }
}

module.exports = ProductMongoDAO;
