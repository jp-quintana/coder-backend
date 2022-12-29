const ProductMongoDAO = require('../daos/product/ProductMongoDAO');
const ProductFileDAO = require('../daos/product/ProductFileDAO');
const ProductFirebaseDAO = require('../daos/product/ProductFirebaseDAO');

const productDb = new ProductMongoDAO();

// const productDb = new ProductFileDAO();

// const productDb = new ProductFirebaseDAO();

console.log(productDb);

exports.getAllProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const product = await productDb.fetchById(id);
      res.json(product);
    } else {
      const products = await productDb.fetchAll();
      res.json(products);
    }
  } catch (err) {
    next(new Error(err));
  }
};
