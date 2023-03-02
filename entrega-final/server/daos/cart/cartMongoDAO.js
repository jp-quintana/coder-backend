const MongoClass = require('../base/MongoClass');
const CartMongo = require('../../models/cart/CartMongo');

class CartMongoDAO extends MongoClass {
  constructor() {
    super(CartMongo);
  }

  async deleteProductInAllCarts(id) {
    return await this.collection.updateMany(
      {},
      { $pull: { products: { productId: id } } }
    );
  }
}

module.exports = CartMongoDAO;
