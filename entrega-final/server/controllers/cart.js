const Cart = require('../models/cart');
const Product = require('../models/product');

const CartMongoDao = require('../daos/cart/cartMongoDAO');
const ProductMongoDao = require('../daos/product/productMongoDAO');

const ProductFileDAO = require('../daos/product/productFileDAO');
const CartFileDAO = require('../daos/cart/cartFileDao');

const ProductFirebaseDAO = require('../daos/product/productFirebaseDAO');
const CartFirebaseDAO = require('../daos/cart/cartFirebaseDao');

const cartDb = new CartMongoDao();
const productDb = new ProductMongoDao();

// const cartDb = new CartFileDAO();
// const productDb = new ProductFileDAO();

// const cartDb = new CartFirebaseDAO();
// const productDb = new ProductFirebaseDAO();

exports.postAddCart = async (req, res, next) => {
  const cart = await cartDb.create({});

  const { id } = cart;

  res.json(id);
};

exports.deleteCart = (req, res, next) => {
  const cartId = req.params.id;
  cartDb.delete(cartId);

  res.json('Success');
};

exports.getCartItems = async (req, res, next) => {
  const cartId = req.params.id;

  const { products: productsInCart } = await cartDb.fetchById(cartId);

  const products = [];

  // Mongoose
  for (const product of productsInCart) {
    const { productId } = product;
    const productDetails = await productDb.fetchById(productId);
    products.push({
      ...productDetails._doc,
      id: productDetails.id,
      quantity: product.quantity,
    });
  }

  // // fs && Firebase
  // for (const product of productsInCart) {
  //   const { id } = product;
  //   const productDetails = await productDb.fetchById(id);
  //   products.push({
  //     ...productDetails,
  //     quantity: product.quantity,
  //   });
  // }

  res.json(products);
};

exports.postAddItemToCart = async (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.body.id;

  // Mongoose
  const product = await productDb.fetchById(prodId);

  if (!product) {
    res.json({ error: 'Producto no existe!' });
    return;
  }

  const cart = await cartDb.fetchById(cartId);
  const { products } = await cart.addProduct(product);

  // // fs && Firebase
  // const { products } = await cartDb.addProduct(cartId, prodId);

  res.json(products);
};

exports.deleteCartItem = async (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.params.id_prod;

  // Mongoose
  const cart = await cartDb.fetchById(cartId);
  await cart.deleteProduct(prodId);

  // // fs && Firebase
  // await cartDb.deleteProduct(cartId, prodId);

  res.json('Success');
};
