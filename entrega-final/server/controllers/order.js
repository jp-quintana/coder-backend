const { fetchOrders, createOrder: _createOrder } = require('../services/order');

exports.getOrders = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const orders = await fetchOrders(userId);
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const cartId = req.params.id;

    await _createOrder({
      cartId,
      userId: req.user.id,
      username: req.user.username,
      address: req.user.address,
    });
    res.json('Success');
  } catch (error) {
    console.log(error);
  }
};
