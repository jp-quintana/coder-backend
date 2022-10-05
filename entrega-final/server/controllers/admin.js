const Product = require('../models/product');

// exports.getAllProducts = async (req, res, next) => {
//   if (!req.user.auth) {
//     res.json({ error: 'Error: Ruta no autorizada.' });
//     return;
//   }
// };

exports.postAddProduct = async (req, res, next) => {
  if (!req.user.auth) {
    res.json({ error: 'Error: Ruta no autorizada.' });
    return;
  }

  const title = req.body.title;
  const description = req.body.description;
  const sku = req.body.sku;
  const thumbnail = req.body.thumbnail;
  const price = req.body.price;
  const stock = req.body.stock;

  const product = new Product({
    title,
    description,
    sku,
    thumbnail,
    price,
    stock,
  });

  await product.save();
  res.json('Success');
};

exports.putEditProduct = async (req, res, next) => {
  if (!req.user.auth) {
    res.json({ error: 'Error: Ruta no autorizada.' });
    return;
  }
  const id = req.params.id;
  const timestamp = req.body.timestamp;
  const title = req.body.title;
  const description = req.body.description;
  const sku = req.body.sku;
  const thumbnail = req.body.thumbnail;
  const price = req.body.price;
  const stock = req.body.stock;

  const product = new Product({
    id,
    timestamp,
    title,
    description,
    sku,
    thumbnail,
    price,
    stock,
  });

  await product.save();
  res.json('Success');
};

exports.deleteProduct = async (req, res, next) => {
  if (!req.user.auth) {
    res.json({ error: 'Error: Ruta no autorizada.' });
    return;
  }
};
