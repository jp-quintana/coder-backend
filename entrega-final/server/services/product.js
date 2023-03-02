const { ProductDAO } = require('../daos/product');
const { CartDAO } = require('../daos/cart');

exports.fetchAllProducts = async (prodId) => {
  return await ProductDAO.fetchAll();
};

exports.fetchProduct = async (prodId) => {
  return await ProductDAO.fetchById(prodId);
};

exports.createProduct = async ({
  title,
  description,
  sku,
  thumbnail,
  price,
  stock,
}) => {
  await ProductDAO.create({
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
  await ProductDAO.update(id, {
    title,
    description,
    sku,
    thumbnail,
    price,
    stock,
  });
};

exports.deleteProduct = async (id) => {
  await cartDAO.deleteProductInAllCarts(id);

  await ProductDAO.delete(id);
};
