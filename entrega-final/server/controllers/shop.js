const ProductMongoDAO = require('../daos/product/ProductMongoDAO');
const ProductFileDAO = require('../daos/product/ProductFileDAO');
const ProductFirebaseDAO = require('../daos/product/ProductFirebaseDAO');

const productDb = new ProductMongoDAO();

// const productDb = new ProductFileDAO();

// const productDb = new ProductFirebaseDAO();

exports.getAllProducts = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const product = await productDb.fetchById(id);
    res.json(product);
  } else {
    const products = await productDb.fetchAll();
    res.json(products);
  }
};
