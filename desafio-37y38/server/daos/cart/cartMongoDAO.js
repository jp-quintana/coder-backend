const MongoClass = require('../../containers/MongoClass');
const CartMongo = require('../../models/cartMongo');

class CartMongoDao extends MongoClass {
  constructor() {
    super(CartMongo);
  }
}

module.exports = CartMongoDao;
