const ProductMongoDAO = require('../daos/ProductMongoDAO');
const CartMongoDAO = require('../daos/CartMongoDAO');

const productDb = new ProductMongoDAO();
const cartDb = new CartMongoDAO();

exports.postAddProduct = async (req, res, next) => {
  if (!req.user.auth) {
    res.json({ error: 'Error: Ruta no autorizada.' });
    return;
  }

  const { title, description, sku, thumbnail, price, stock } = req.body;

  await productDb.create({
    title,
    description,
    sku,
    thumbnail,
    price,
    stock,
  });

  res.json('Success');
};

exports.putEditProduct = async (req, res, next) => {
  if (!req.user.auth) {
    res.json({ error: 'Error: Ruta no autorizada.' });
    return;
  }
  const { id } = req.params;

  const { title, description, sku, thumbnail, price, stock } = req.body;

  await productDb.update(id, {
    title,
    description,
    sku,
    thumbnail,
    price,
    stock,
  });

  res.json('Success');
};

exports.deleteProduct = async (req, res, next) => {
  if (!req.user.auth) {
    res.json({ error: 'Error: Ruta no autorizada.' });
    return;
  }

  const { id } = req.params;

  await cartDb.deleteInAllDocs(id);

  await productDb.delete(id);
  res.json('Success');
};
