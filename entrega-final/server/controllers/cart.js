const Cart = require('../models/cart');
const Product = require('../models/product');

const CartMongoDao = require('../daos/CartMongoDao');
const ProductMongoDao = require('../daos/ProductMongoDao');

const cartDb = new CartMongoDao();
const productDb = new ProductMongoDao();

exports.postAddCart = async (req, res, next) => {
  // const cart = new Cart({});
  // const cartId = await cart.save();

  // res.json(cartId);
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

  // res.json(productsInCart);

  const products = [];

  for (const product of productsInCart) {
    const { productId } = product;
    const productDetails = await productDb.fetchById(productId);
    products.push({
      ...productDetails._doc,
      id: productDetails.id,
      quantity: product.quantity,
    });
  }

  res.json(products);
};

exports.postAddItemToCart = async (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.body.id;

  // const product = await Product.fetchById(prodId);
  const product = await productDb.fetchById(prodId);
  console.log(product);

  if (!product) {
    res.json({ error: 'Producto no existe!' });
    return;
  }

  const cart = await cartDb.fetchById(cartId);

  console.log('cart', cart);

  const { products } = await cart.addProduct(product);

  console.log('products', products);
  res.json(products);
};

exports.deleteCartItem = async (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.params.id_prod;

  const cart = await cartDb.fetchById(cartId);

  const { products } = await cart.deleteProduct(prodId);

  console.log(products);

  res.json('Success');
};
