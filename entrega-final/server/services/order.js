const { CartDAO } = require('../daos/cart');
const { ProductDAO } = require('../daos/product');
const { OrderDAO } = require('../daos/order');

const { transporter } = require('../utils/mailer');

exports.fetchOrders = async (userId) => {
  return await OrderDAO.fetchOrders(userId);
};

exports.createOrder = async ({ cartId, userId, username, address }) => {
  const cart = await CartDAO.fetchById(cartId);

  const { products: productsInCart } = cart;

  const products = [];

  for (const product of productsInCart) {
    const { productId } = product;
    const productDetails = await ProductDAO.fetchProduct(productId);
    products.push({
      ...productDetails,
      id: productDetails.id,
      quantity: product.quantity,
    });
  }

  const contentHTML = `
      <h1>Informacion del usuario</h1>
      <ul>
        <li>
          Nombre de usuario: ${username}
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
    subject: `Orden Creada por ${username}`, // Subject line
    html: contentHTML, // html body
  });

  await OrderDAO.create({
    products,
    userId,
    username,
    address,
  });
  await CartDAO.delete(cartId);
};
