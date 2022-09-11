const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/productos', adminController.getAllProducts);

router.get('/productos/:id', adminController.getById);

router.get('/', adminController.getIndex);

router.post('/productos', adminController.postAddProduct);

router.put('/productos', adminController.putEditProduct);

router.delete('/productos/:id', adminController.deleteProduct);

module.exports = router;
