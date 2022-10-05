const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getCart = (req, res, next) => {
  console.log('hola');
};

exports.postAddCart = (req, res, next) => {
  const cart = new Cart({});
  cart.save();
};

exports.deleteCart = (req, res, next) => {
  const cartId = req.params.id;
  Cart.delete(cartId);
};

exports.getCartItems = async (req, res, next) => {
  const cartId = req.params.id;
  const products = await Cart.fetchProducts(cartId);

  res.json(products);
};

exports.postAddItemToCart = async (req, res, next) => {
  const cartId = req.params.id;
  const productId = req.body.id;

  const product = await Product.fetchById(productId);

  Cart.addProduct(cartId, product);
};

exports.deleteCartItem = (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.params.id_prod;

  Cart.deleteProduct(cartId, prodId);
};
