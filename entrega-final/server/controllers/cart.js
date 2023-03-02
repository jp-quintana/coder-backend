// const Cart = require('../models/cart');
// const Product = require('../models/product');

// const ProductFileDAO = require('../daos/product/productFileDAO');
// const CartFileDAO = require('../daos/cart/cartFileDao');

// const ProductFirebaseDAO = require('../daos/product/productFirebaseDAO');
// const CartFirebaseDAO = require('../daos/cart/cartFirebaseDao');

// const cartDb = new CartFileDAO();
// const productDb = new ProductFileDAO();

// const cartDb = new CartFirebaseDAO();
// const productDb = new ProductFirebaseDAO();

const {
  createCart,
  deleteCart: _deleteCart,
  fetchCart,
  addItemToCart,
  deleteCartItem: _deleteCartItem,
} = require('../services/cart');

const { fetchProduct } = require('../services/product');

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
  try {
    const cartId = req.params.id;

    const items = await fetchCart(cartId);

    res.json(items);
  } catch (error) {
    console.log(error);
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
};

exports.postAddItemToCart = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const prodId = req.body.id;

    const product = await fetchProduct(prodId);

    if (!product) {
      return Error({ message: 'Producto no existe' });
    }

    const cartItems = await addItemToCart({ cartId, prodId, product });

    res.json(cartItems);
  } catch (error) {
    console.log(error);
  }

  // // fs && Firebase
  // const { products } = await cartDb.addProduct(cartId, prodId);
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const prodId = req.params.id_prod;

    await _deleteCartItem({ cartId, prodId });
    res.json('Success');
  } catch (error) {
    console.log(error);
  }

  // // fs && Firebase
  // await cartDb.deleteProduct(cartId, prodId);
};

exports.createOrder = async (req, res, next) => {
  try {
    const cartId = req.params.id;

    await _createOrder(cartId);
    res.json('Success');
  } catch (error) {
    console.log(error);
  }
};
