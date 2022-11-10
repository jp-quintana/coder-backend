const path = require('path');

const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Inicio',
    path: '/',
    activeHome: true,
  });
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.getById = async (req, res, next) => {
  prodId = req.params.id;
  try {
    const product = await Product.getById(prodId);
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

exports.postAddProduct = async (req, res, next) => {
  const { title, price, thumbnail } = req.body;
  const product = new Product({ title, price, thumbnail });

  const createdProduct = await product.save();
  res.json(createdProduct);
};

exports.putEditProduct = async (req, res, next) => {
  const prodId = req.params.id;
  const { title, price, thumbnail } = req.query;
  const product = new Product({ title, price, thumbnail });

  const updatedProduct = await product.edit(prodId);
  res.json(updatedProduct);
};

exports.deleteProduct = async (req, res, next) => {
  prodId = req.params.id;
  const deletedProduct = await Product.delete(prodId);
  res.json(deletedProduct);
};
