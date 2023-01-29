const ProductMongoDAO = require('../daos/product/productMongoDAO');
const CartMongoDAO = require('../daos/cart/cartMongoDAO');

const ProductFileDAO = require('../daos/product/productFileDAO');
const CartFileDAO = require('../daos/cart/cartFileDAO');

const ProductFirebaseDAO = require('../daos/product/productFirebaseDAO');
const CartFirebaseDAO = require('../daos/cart/cartFirebaseDAO');

const productDb = new ProductMongoDAO();
const cartDb = new CartMongoDAO();

// const productDb = new ProductFileDAO();
// const cartDb = new CartFileDAO();

// const productDb = new ProductFirebaseDAO();
// const cartDb = new CartFirebaseDAO();

const {
  createProduct,
  editProduct,
  // deleteProduct: _deleteProduct,
} = require('../services/product');

exports.postAddProduct = async (req, res, next) => {
  // if (!req.session.isAdmin) {
  //   res.json({ error: 'Error: Ruta no autorizada.' });
  //   return;
  // }

  const { title, description, sku, thumbnail, price, stock } = req.body;

  await createProduct({ title, description, sku, thumbnail, price, stock });

  res.json('Success');
};

exports.putEditProduct = async (req, res, next) => {
  // if (!req.session.isAdmin) {
  //   res.json({ error: 'Error: Ruta no autorizada.' });
  //   return;
  // }
  const { id } = req.params;

  const { title, description, sku, thumbnail, price, stock } = req.body;

  await editProduct({ title, description, sku, thumbnail, price, stock });

  res.json('Success');
};

exports.deleteProduct = async (req, res, next) => {
  // if (!req.session.isAdmin) {
  //   res.json({ error: 'Error: Ruta no autorizada.' });
  //   return;
  // }

  const { id } = req.params;

  await _deleteProduct(id);

  res.json('Success');
};
