const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/:id?', shopController.getAllProducts);

module.exports = router;
