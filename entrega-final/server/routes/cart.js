const express = require('express');
const needAuth = require('../middlewares/needAuth');

const cartController = require('../controllers/cart');

const router = express.Router();

router.post('/', needAuth, cartController.postAddCart);

router.delete('/:id', needAuth, cartController.deleteCart);

router.get('/:id/productos', needAuth, cartController.getCartItems);

router.post('/:id/productos', needAuth, cartController.postAddItemToCart);

router.delete(
  '/:id/productos/:id_prod',
  needAuth,
  cartController.deleteCartItem
);

// router.post('/:id/confirm', needAuth, cartController.createOrder);

module.exports = router;
