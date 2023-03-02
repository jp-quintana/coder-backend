const { CartDAO } = require('../daos/cart');
const { ProductDAO } = require('../daos/product');

const { transporter } = require('../utils/mailer');

exports.createCart = async () => {
  const { id } = await CartDAO.create({});
  return id;
};

exports.deleteCart = async (cartId) => {
  await CartDAO.delete(cartId);
};

exports.fetchCart = async (cartId) => {
  const cart = await CartDAO.fetchById(cartId);

  const products = [];

  if (cart) {
    const { products: productsInCart } = cart;

    for (const product of productsInCart) {
      const { productId } = product;
      const productDetails = await ProductDAO.fetchById(productId);
      products.push({
        ...productDetails._doc,
        id: productDetails.id,
        quantity: product.quantity,
      });
    }
  }

  return products;
};

exports.addItemToCart = async ({ cartId, prodId, product }) => {
  const cart = await CartDAO.fetchById(cartId);

  let items;

  if (cart) {
    const { products } = await cart.addProduct(product);
    items = products;
  } else {
    const newCart = await CartDAO.create({
      _id: cartId,
      products: [
        {
          productId: prodId,
          quantity: 1,
        },
      ],
    });
    const { products } = newCart;
    items = products;
  }

  return items;
};

exports.deleteCartItem = async ({ cartId, prodId }) => {
  const cart = await CartDAO.fetchById(cartId);
  await cart.deleteProduct(prodId);

  if (cart.products.length === 0) {
    cart.delete(cartId);
  }
};
