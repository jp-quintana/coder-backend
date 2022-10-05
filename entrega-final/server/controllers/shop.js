const Product = require('../models/product');

exports.getAllProducts = async (req, res, next) => {
  const prodId = req.query.id;
  if (prodId) {
    const product = await Product.fetchById(prodId);
    res.json(product);
  } else {
    const products = await Product.fetchAll();
    console.log(products);
    res.json(products);
  }
};
