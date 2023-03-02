const { cartDAO } = require('../daos/cart');
const { productDAO } = require('../daos/product');

const { transporter } = require('../utils/mailer');

exports.createCart = async () => {
  const { id } = await cartDAO.create({});
  return id;
};

exports.deleteCart = async (cartId) => {
  await cartDAO.delete(cartId);
};

exports.fetchCart = async (cartId) => {
  const cart = await cartDAO.fetchById(cartId);

  const products = [];

  if (cart) {
    const { products: productsInCart } = cart;

    for (const product of productsInCart) {
      const { productId } = product;
      const productDetails = await productDAO.fetchById(productId);
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
  const cart = await cartDAO.fetchById(cartId);

  let items;

  if (cart) {
    const { products } = await cart.addProduct(product);
    items = products;
  } else {
    const newCart = await cartDAO.create({
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
  const cart = await cartDAO.fetchById(cartId);
  await cart.deleteProduct(prodId);

  if (cart.products.length === 0) {
    cart.delete(cartId);
  }
};
