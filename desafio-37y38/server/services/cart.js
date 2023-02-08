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

exports.deleteCart = async (cartId) => {
  try {
    await cartDb.delete(cartId);
  } catch (error) {
    console.log(error);
  }
};

exports.fetchCartItems = async (cartId) => {
  try {
    const cart = await cartDb.fetchById(cartId);

    const products = [];

    if (cart) {
      const { products: productsInCart } = cart;

      // Mongoose
      for (const product of productsInCart) {
        const { productId } = product;
        const productDetails = await productDb.fetchById(productId);
        products.push({
          ...productDetails._doc,
          id: productDetails.id,
          quantity: product.quantity,
        });
      }
    }

    return products;
  } catch (error) {
    console.log(error);
  }
};

exports.addItemToCart = async (cartId, prodId) => {
  const product = await productDb.fetchById(prodId);

  if (!product) {
    return Error({ message: 'Producto no existe' });
  }

  const cart = await cartDb.fetchById(cartId);

  if (cart) {
    const { products } = await cart.addProduct(product);
    res.json(products);
  } else {
    const newCart = await cartDb.create({
      _id: cartId,
      products: [
        {
          productId: prodId,
          quantity: 1,
        },
      ],
    });
    res.json(newCart.products);
  }

  // // fs && Firebase
  // const { products } = await cartDb.addProduct(cartId, prodId);
};
