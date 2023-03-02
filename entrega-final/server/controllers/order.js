const { fetchOrders, createOrder: _createOrder } = require('../services/order');

exports.getOrders = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const orders = await fetchOrders(userId);
    console.log('running');
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const cartId = req.params.id;

    await _createOrder(cartId);
    res.json('Success');
  } catch (error) {
    console.log(error);
  }
};
