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
  deleteProduct: _deleteProduct,
} = require('../services/product');

exports.postAddProduct = async (req, res, next) => {
  const { title, description, sku, thumbnail, price, stock } = req.body;

  try {
    await createProduct({ title, description, sku, thumbnail, price, stock });

    res.json('Success');
  } catch (error) {
    console.log(error);
  }
};

exports.putEditProduct = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, sku, thumbnail, price, stock } = req.body;

  try {
    await editProduct(id, { title, description, sku, thumbnail, price, stock });

    res.json('Success');
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    await _deleteProduct(id);

    res.json('Success');
  } catch (error) {
    console.log(error);
  }
};
