const mongoose = require('mongoose');

const MongoClass = require('../base/MongoClass');
const CartMongo = require('../../models/cartMongo');

class CartMongoDao extends MongoClass {
  constructor() {
    super(CartMongo);
  }

  async deleteInAllCarts(id) {
    return await this.collection.updateMany(
      {},
      { $pull: { products: { productId: id } } }
    );
  }
}

module.exports = CartMongoDao;
