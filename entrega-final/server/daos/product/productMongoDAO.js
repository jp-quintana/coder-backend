const MongoClass = require('../base/MongoClass');
const ProductMongo = require('../../models/product/ProductMongo');

class ProductMongoDAO extends MongoClass {
  constructor() {
    super(ProductMongo);
  }

  async fetchProduct(id) {
    const data = await this.collection.findById(id);

    let jsonData = JSON.stringify(data);
    let parsedMap = JSON.parse(jsonData);

    return parsedMap;
  }
}

module.exports = ProductMongoDAO;
