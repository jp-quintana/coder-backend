// const ProductFileDAO = require('../daos/product/ProductFileDAO');
// const ProductFirebaseDAO = require('../daos/product/ProductFirebaseDAO');

const { fetchProduct, fetchAllProducts } = require('../services/product');

// const productDb = new ProductFileDAO();

// const productDb = new ProductFirebaseDAO();

exports.getAllProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const product = await fetchProduct(id);
      res.json(product);
    } else {
      const products = await fetchAllProducts();
      res.json(products);
    }
  } catch (err) {
    next(new Error(err));
  }
};
