const CartMongoDao = require('../daos/cart/cartMongoDAO');
const ProductMongoDao = require('../daos/product/productMongoDAO');

const { transporter } = require('../utils/mailer');

const cartDb = new CartMongoDao();
const productDb = new ProductMongoDao();

exports.createCart = async () => {
  const { id } = await cartDb.create({});
  return id;
};

exports.deleteCart = async (cartId) => {
  await cartDb.delete(cartId);
};

exports.fetchCart = async (cartId) => {
  const cart = await cartDb.fetchById(cartId);

  const products = [];

  if (cart) {
    const { products: productsInCart } = cart;

    for (const product of productsInCart) {
      const { productId } = product;
      const productDetails = await productDb.fetchById(productId);
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
  const cart = await cartDb.fetchById(cartId);

  let items;

  if (cart) {
    const { products } = await cart.addProduct(product);
    items = products;
  } else {
    const newCart = await cartDb.create({
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
  const cart = await cartDb.fetchById(cartId);
  await cart.deleteProduct(prodId);

  if (cart.products.length === 0) {
    cart.delete(cartId);
  }
};
