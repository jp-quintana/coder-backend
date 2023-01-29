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
  try {
    await productDb.create({
      title,
      description,
      sku,
      thumbnail,
      price,
      stock,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editProduct = async (
  id,
  { title, description, sku, thumbnail, price, stock }
) => {
  try {
    await productDb.update(id, {
      title,
      description,
      sku,
      thumbnail,
      price,
      stock,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (id) => {
  try {
    await cartDb.deleteInAllDocs(id);

    await productDb.delete(id);
  } catch (error) {
    console.log(error);
  }
};
