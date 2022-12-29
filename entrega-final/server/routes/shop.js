const express = require('express');

const shopControllers = require('../controllers/shop');

const router = express.Router();

router.get('/:id?', shopControllers.getAllProducts);

module.exports = router;
