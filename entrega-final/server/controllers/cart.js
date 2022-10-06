const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getCart = (req, res, next) => {
  console.log('hola');
};

exports.postAddCart = (req, res, next) => {
  const cart = new Cart({});
  cart.save();

  res.json('Success');
};

exports.deleteCart = (req, res, next) => {
  const cartId = req.params.id;
  Cart.delete(cartId);

  res.json('Success');
};

exports.getCartItems = async (req, res, next) => {
  const cartId = req.params.id;
  const productsIds = await Cart.fetchProducts(cartId);

  const products = [];

  for (const product of productsIds) {
    const productDetails = await Product.fetchById(product.id);
    products.push({ ...productDetails, quantity: product.quantity });
  }

  res.json(products);
};

exports.postAddItemToCart = async (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.body.id;

  const product = await Product.fetchById(prodId);

  if (!product) {
    res.json({ error: 'Producto no existe!' });
    return;
  }

  Cart.addProduct(cartId, prodId);
  res.json('Success');
};

exports.deleteCartItem = (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.params.id_prod;

  Cart.deleteProduct(cartId, prodId);

  res.json('Success');
};
