const MongoClass = require('../base/MongoClass');
const CartMongo = require('../../models/cart/CartMongo');

class CartMongoDAO extends MongoClass {
  constructor() {
    super(CartMongo);
  }

  async addItemToCart({ userId, productId, product }) {
    const cart = await this.fetchById(userId);

    if (cart) {
      await cart.addProduct(product);
    } else {
      await this.create({
        _id: userId,
        products: [
          {
            productId: productId,
            quantity: 1,
          },
        ],
      });
    }
  }

  async removeItemFromCart({ userId, productId }) {
    const cart = await this.fetchById(userId);

    await cart.deleteProduct(productId);

    if (cart.products.length === 0) {
      cart.delete(userId);
    }
  }

  async deleteProductInAllCarts(id) {
    return await this.collection.updateMany(
      {},
      { $pull: { products: { productId: id } } }
    );
  }
}

module.exports = CartMongoDAO;
