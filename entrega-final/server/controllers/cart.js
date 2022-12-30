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

// const cartDb = new CartFileDAO();
// const productDb = new ProductFileDAO();

// const cartDb = new CartFirebaseDAO();
// const productDb = new ProductFirebaseDAO();

exports.postAddCart = async (req, res, next) => {
  const cart = await cartDb.create({});

  const { id } = cart;

  res.json(id);
};

exports.deleteCart = (req, res, next) => {
  const cartId = req.params.id;
  cartDb.delete(cartId);

  res.json('Success');
};

exports.getCartItems = async (req, res, next) => {
  const cartId = req.params.id;

  const cart = await cartDb.fetchById(cartId);

  if (cart) {
    const { products: productsInCart } = cart;

    const products = [];

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

    res.json(products);
  } else {
    res.json([]);
  }

  // // fs && Firebase
  // for (const product of productsInCart) {
  //   const { id } = product;
  //   const productDetails = await productDb.fetchById(id);
  //   products.push({
  //     ...productDetails,
  //     quantity: product.quantity,
  //   });
  // }
};

exports.postAddItemToCart = async (req, res, next) => {
  const cartId = req.params.id;
  const prodId = req.body.id;

  // Mongoose
  const product = await productDb.fetchById(prodId);

  if (!product) {
    res.json({ error: 'Producto no existe!' });
    return;
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
