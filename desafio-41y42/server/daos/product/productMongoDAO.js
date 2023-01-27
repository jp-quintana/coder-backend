const MongoClass = require('../../containers/MongoClass');
const ProductMongo = require('../../models/productMongo');

class ProductMongoDAO extends MongoClass {
  constructor() {
    super(ProductMongo);
  }
}

module.exports = ProductMongoDAO;
