const Cart = require('../models/cart');
const Product = require('../models/product');

const CartMongoDao = require('../daos/cart/cartMongoDAO');
const ProductMongoDao = require('../daos/product/productMongoDAO');

const ProductFileDAO = require('../daos/product/productFileDAO');
const CartFileDAO = require('../daos/cart/cartFileDao');

const ProductFirebaseDAO = require('../daos/product/productFirebaseDAO');
const CartFirebaseDAO = require('../daos/cart/cartFirebaseDao');

const { transporter } = require('../utils/mailer');

const cartDb = new CartMongoDao();
const productDb = new ProductMongoDao();

const { fetchProduct } = require('../services/product');

const {
  createCart,
  deleteCart: _deleteCart,
  fetchCart,
  addItemToCart,
  deleteCartItem: _deleteCartItem,
} = require('../services/cart');

const { createOrder: _createOrder } = require('../services/order');

// const cartDb = new CartFileDAO();
// const productDb = new ProductFileDAO();

// const cartDb = new CartFirebaseDAO();
// const productDb = new ProductFirebaseDAO();

exports.postAddCart = async (req, res, next) => {
  try {
    const cartId = await createCart();

    res.json(cartId);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  const cartId = req.params.id;

  try {
    await _deleteCart(cartId);

    res.json('Success');
  } catch (error) {
    console.log(error);
  }
};

exports.getCartItems = async (req, res, next) => {
  const cartId = req.params.id;

  try {
    const items = await fetchCart(cartId);

    res.json(items);
  } catch (error) {
    console.log(error);
  }
};

exports.postAddItemToCart = async (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.body.id;

  try {
    const product = await fetchProduct(prodId);

    if (!product) {
      return Error({ message: 'Producto no existe' });
    }

    const cartItems = await addItemToCart({ cartId, prodId, product });

    res.json(cartItems);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCartItem = async (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.params.id_prod;

  try {
    await _deleteCartItem({ cartId, prodId });
    res.json('Success');
  } catch (error) {
    console.log(error);
  }
};

exports.createOrder = async (req, res, next) => {
  const cartId = req.params.id;

  try {
    await _createOrder(cartId);
    res.json('Success');
  } catch (error) {
    console.log(error);
  }
};
