const CartMongoDao = require('../daos/cart/cartMongoDAO');
const ProductMongoDao = require('../daos/product/productMongoDAO');
const { transporter } = require('../utils/mailer');

const cartDb = new CartMongoDao();
const productDb = new ProductMongoDao();

exports.createCart = async () => {
  try {
    await cartDb.create({});
  } catch (error) {}
};
