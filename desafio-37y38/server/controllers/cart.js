const Cart = require('../models/cart');
const Product = require('../models/product');

const CartMongoDao = require('../daos/cart/cartMongoDAO');
const ProductMongoDao = require('../daos/product/productMongoDAO');

const ProductFileDAO = require('../daos/product/productFileDAO');
const CartFileDAO = require('../daos/cart/cartFileDao');

const ProductFirebaseDAO = require('../daos/product/productFirebaseDAO');
const CartFirebaseDAO = require('../daos/cart/cartFirebaseDao');

const { transporter } = require('../utils/mailer');

const cartDb = new CartMongoDao();
const productDb = new ProductMongoDao();

const {
  createCart,
  deleteCart: _deleteCart,
  fetchCartItems,
  addItemToCart,
} = require('../services/cart');

// const cartDb = new CartFileDAO();
// const productDb = new ProductFileDAO();

// const cartDb = new CartFirebaseDAO();
// const productDb = new ProductFirebaseDAO();

exports.postAddCart = async (req, res, next) => {
  const cartId = await createCart();

  res.json(cartId);
};

exports.deleteCart = async (req, res, next) => {
  const cartId = req.params.id;

  await _deleteCart(cartId);

  res.json('Success');
};

exports.getCartItems = async (req, res, next) => {
  const cartId = req.params.id;

  const items = await fetchCartItems(cartId);

  res.json(items);
};

exports.postAddItemToCart = async (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.body.id;

  try {
    addItemToCart({ cartId, prodId });
    res.json({});
  } catch (error) {
    console.log('aca', error);
  }
};

exports.deleteCartItem = async (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.params.id_prod;

  // Mongoose
  const cart = await cartDb.fetchById(cartId);
  await cart.deleteProduct(prodId);

  if (cart.products.length === 0) {
    cart.delete(cartId);
  }

  // // fs && Firebase
  // await cartDb.deleteProduct(cartId, prodId);

  res.json('Success');
};

exports.createOrder = async (req, res, next) => {
  console.log('working');

  const cartId = req.params.id;

  const cart = await cartDb.fetchById(cartId);

  const { products: productsInCart } = cart;

  const products = [];

  for (const product of productsInCart) {
    const { productId } = product;
    const productDetails = await productDb.fetchById(productId);
    products.push({
      ...productDetails._doc,
      id: productDetails.id,
      quantity: product.quantity,
    });
  }

  // const productsHTML = [];

  // for (const product of products) {
  //   productsHTML.push(`
  //   <ul>
  //     <li>
  //       Producto: ${product.title}
  //     </li>
  //     <li>
  //       Precio: ${product.price}
  //     </li>
  //     <li>
  //       SKU: ${product.sku}
  //     </li>
  //   </ul>
  //   `);
  // }

  const contentHTML = `
      <h1>Informacion del usuario</h1>
      <ul>
        <li>
          Nombre de usuario: ${req.user.username}
        </li>
      </ul>
      <h1>Informacion de compra</h1>
        ${products.map(
          (product) =>
            `<ul>
            <li>Producto: ${product.title}</li>
            <li>Precio: ${product.price}</li>
            <li>SKU: ${product.sku}</li>
          </ul>`
        )}
    `;

  let info = await transporter.sendMail({
    from: '"CODER API" <process.env.EMAIL_ADMIN>', // sender address
    to: process.env.EMAIL_ADMIN, // list of receivers
    subject: `Orden Creada por ${req.user.username}`, // Subject line
    html: contentHTML, // html body
  });

  await cartDb.delete(cartId);

  res.json('Success');
};
