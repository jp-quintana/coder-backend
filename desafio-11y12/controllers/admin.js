const path = require('path');

const Product = require('../models/product');

const rootDir = require('../utils/path');

exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Inicio',
    path: '/',
    activeHome: true,
  });
};

// exports.getAllProducts = async (req, res, next) => {
//   try {
//     const products = await Product.getAll();
//     res.render('products', {
//       products,
//       pageTitle: 'Productos',
//       path: '/productos',
//       activeProducts: true,
//       hasProducts: products.length > 0,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.getById = async (req, res, next) => {
//   prodId = req.params.id;
//   console.log(prodId);
//   try {
//     const product = await Product.getById(prodId);
//     res.send(product);
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.postAddProduct = async (req, res, next) => {
//   const title = req.body.title;
//   const price = req.body.price;
//   const thumbnail = req.body.thumbnail;
//   const product = new Product({ title, price, thumbnail });
//   await product.save();
//   res.redirect('/productos');
// };

// exports.putEditProduct = async (req, res, next) => {
//   const prodId = req.query.id;
//   const title = req.query.title;
//   const price = parseInt(req.query.price);
//   const thumbnail = req.query.thumbnail;
//   await Product.edit(prodId, { title, price, thumbnail });
//   res.redirect('/productos');
// };

// exports.deleteProduct = async (req, res, next) => {
//   prodId = req.params.id;
//   await Product.delete(prodId);
//   res.redirect('/productos');
// };
