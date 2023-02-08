const CartMongoDao = require('../daos/cart/cartMongoDAO');
const ProductMongoDao = require('../daos/product/productMongoDAO');

const { transporter } = require('../utils/mailer');

const cartDb = new CartMongoDao();
const productDb = new ProductMongoDao();

exports.createOrder = async (cartId) => {
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
};
