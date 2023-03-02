const { productDAO } = require('../daos/product');
const { cartDAO } = require('../daos/cart');

exports.fetchAllProducts = async (prodId) => {
  return await productDAO.fetchAll();
};

exports.fetchProduct = async (prodId) => {
  return await productDAO.fetchById(prodId);
};

exports.createProduct = async ({
  title,
  description,
  sku,
  thumbnail,
  price,
  stock,
}) => {
  await productDAO.create({
    title,
    description,
    sku,
    thumbnail,
    price,
    stock,
  });
};

exports.editProduct = async (
  id,
  { title, description, sku, thumbnail, price, stock }
) => {
  await productDAO.update(id, {
    title,
    description,
    sku,
    thumbnail,
    price,
    stock,
  });
};

exports.deleteProduct = async (id) => {
  await cartDAO.deleteInAllCarts(id);

  await productDAO.delete(id);
};
