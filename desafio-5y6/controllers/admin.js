const Products = require('../models/products');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Products.getAll();
    res.send(products);
  } catch (err) {
    console.log(err);
  }
};

exports.getRandomProduct = async (req, res, next) => {
  try {
    const products = await Products.getAll();
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    res.send(randomProduct);
  } catch (err) {
    console.log(err);
  }
};
