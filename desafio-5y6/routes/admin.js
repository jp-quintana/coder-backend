const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/productos', adminController.getAllProducts);

router.get('/productoRandom', adminController.getRandomProduct);

module.exports = router;
