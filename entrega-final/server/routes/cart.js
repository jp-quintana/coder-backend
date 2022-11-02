const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();

router.post('/', cartController.postAddCart);

router.delete('/:id', cartController.deleteCart);

router.get('/:id/productos', cartController.getCartItems);

router.post('/:id/productos', cartController.postAddItemToCart);

router.delete('/:id/productos/:id_prod', cartController.deleteCartItem);

module.exports = router;
