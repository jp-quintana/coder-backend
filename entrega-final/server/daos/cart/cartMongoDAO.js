const MongoClass = require('../base/MongoClass');
const CartMongo = require('../../models/cart/CartMongo');

class CartMongoDAO extends MongoClass {
  constructor() {
    super(CartMongo);
  }

  // async createCart({ userId, products }) {
  //   return await this.create({ _id: userId, products });
  // }

  // async fetchCart(userId) {
  //   const cart = await CartDAO.fetchById(userId);

  //   const products = [];

  //   if (cart) {
  //     const { products: productsInCart } = cart;

  //     for (const product of productsInCart) {
  //       const { productId } = product;
  //       const productDetails = await ProductDAO.fetchById(productId);
  //       products.push({
  //         ...productDetails._doc,
  //         id: productDetails.id,
  //         quantity: product.quantity,
  //       });

  //       console.log('productDetails', productDetails);
  //     }
  //   }

  //   return products;
  // };

  async addItemToCart({ userId, productId, product }) {
    const cart = await this.fetchById(userId);

    console.log('YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', userId);

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

  async deleteProductInAllCarts(id) {
    return await this.collection.updateMany(
      {},
      { $pull: { products: { productId: id } } }
    );
  }
}

module.exports = CartMongoDAO;
