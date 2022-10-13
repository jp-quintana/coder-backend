const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);

router.get('/productos', adminController.getAllProducts);

router.get('/productos/:id', adminController.getById);

router.post('/productos', adminController.postAddProduct);

router.put('/productos/:id', adminController.putEditProduct);

router.delete('/productos/:id', adminController.deleteProduct);

module.exports = router;
