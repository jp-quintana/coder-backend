const ProductMongoDAO = require('../daos/ProductMongoDAO');

const productDb = new ProductMongoDAO();

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
