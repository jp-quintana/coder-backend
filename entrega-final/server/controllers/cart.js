const {
  deleteCart: _deleteCart,
  fetchCart,
  addItemToCart,
  deleteCartItem: _deleteCartItem,
} = require('../services/cart');

const { fetchProduct } = require('../services/product');

exports.deleteCart = async (req, res, next) => {
  const cartId = req.params.id;

  try {
    await _deleteCart(cartId);

    res.json('Success');
  } catch (error) {
    console.log(error);
  }
};

exports.getCartItems = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const items = await fetchCart(userId);

    res.json(items);
  } catch (error) {
    console.log(error);
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
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    const product = await fetchProduct(productId);

    if (!product) {
      return Error({ message: 'Producto no existe' });
    }

    await addItemToCart({ userId, productId, product });

    res.json('Success');
  } catch (error) {
    console.log(error);
  }

  // // fs && Firebase
  // const { products } = await cartDb.addProduct(cartId, prodId);
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const productId = req.params.id_prod;

    await _deleteCartItem({ userId, productId });
    res.json('Success');
  } catch (error) {
    console.log(error);
  }

  // // fs && Firebase
  // await .deleteProduct(cartId, prodId);
};

// exports.createOrder = async (req, res, next) => {
//   try {
//     const cartId = req.params.id;

//     await _createOrder(cartId);
//     res.json('Success');
//   } catch (error) {
//     console.log(error);
//   }
// };
