const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// router.get('/:id?', adminController.getAllProducts);

router.post('/', adminController.postAddProduct);

router.put('/:id', adminController.putEditProduct);

router.delete('/:id', adminController.deleteProduct);

module.exports = router;
