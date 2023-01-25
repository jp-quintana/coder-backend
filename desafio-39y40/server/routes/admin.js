const express = require('express');
const needAdmin = require('../middlewares/needAdmin');

const adminController = require('../controllers/admin');

const router = express.Router();

// router.get('/:id?', adminController.getAllProducts);

router.post('/', needAdmin, adminController.postAddProduct);

router.put('/:id', needAdmin, adminController.putEditProduct);

router.delete('/:id', needAdmin, adminController.deleteProduct);

module.exports = router;
