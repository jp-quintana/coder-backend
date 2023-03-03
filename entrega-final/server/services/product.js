const { ProductDAO } = require('../daos/product');
const { CartDAO } = require('../daos/cart');

exports.fetchAllProducts = async () => {
  return await ProductDAO.fetchAll();
};

exports.fetchProduct = async (productId) => {
  return await ProductDAO.fetchById(productId);
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
  await CartDAO.deleteProductInAllCarts(id);

  await ProductDAO.delete(id);
};
