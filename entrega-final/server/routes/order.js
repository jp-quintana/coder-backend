const express = require('express');
const needAuth = require('../middlewares/needAuth');

const orderControllers = require('../controllers/order');

const router = express.Router();

router.get('/:id', needAuth, orderControllers.getOrders);

router.post('/:id/confirm', needAuth, orderControllers.createOrder);

module.exports = router;
