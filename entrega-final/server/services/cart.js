const { CartDAO } = require('../daos/cart');
const { ProductDAO } = require('../daos/product');

exports.createCart = async (userId) => {
  await CartDAO.createCart(userId);
};

exports.deleteCart = async (cartId) => {
  await CartDAO.delete(cartId);
};

exports.fetchCart = async (userId) => {
  const cart = await CartDAO.fetchById(userId);

  const products = [];

  if (cart) {
    const { products: productsInCart } = cart;

    for (const product of productsInCart) {
      const { productId } = product;
      const productDetails = await ProductDAO.fetchProduct(productId);
      products.push({
        ...productDetails,
        id: productDetails.id,
        quantity: product.quantity,
      });
    }
  }

  return products;
};

exports.addItemToCart = async ({ userId, productId, product }) => {
  await CartDAO.addItemToCart({ userId, productId, product });
};

exports.deleteCartItem = async ({ cartId, prodId }) => {
  const cart = await CartDAO.fetchById(cartId);
  await cart.deleteProduct(prodId);

  if (cart.products.length === 0) {
    cart.delete(cartId);
  }
};
