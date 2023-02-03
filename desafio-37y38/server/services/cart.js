const CartMongoDao = require('../daos/cart/cartMongoDAO');
const ProductMongoDao = require('../daos/product/productMongoDAO');
const { transporter } = require('../utils/mailer');

const cartDb = new CartMongoDao();
const productDb = new ProductMongoDao();

exports.createCart = async () => {
  try {
    const { id } = await cartDb.create({});
    return id;
  } catch (error) {
    console.log(error);
  }
};
