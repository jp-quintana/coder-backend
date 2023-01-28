const ProductMongoDAO = require('../daos/product/productMongoDAO');
const CartMongoDAO = require('../daos/cart/cartMongoDAO');

const productDb = new ProductMongoDAO();
const cartDb = new CartMongoDAO();

exports.createProduct = async ({
  title,
  description,
  sku,
  thumbnail,
  price,
  stock,
}) => {
  await productDb.create({
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
  await productDb.update(id, {
    title,
    description,
    sku,
    thumbnail,
    price,
    stock,
  });
};

exports.deleteProduct = async (id) => {
  await cartDb.deleteInAllDocs(id);

  await productDb.delete(id);
};
