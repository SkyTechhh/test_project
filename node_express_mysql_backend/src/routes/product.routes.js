const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller');

router.get('/list', productController.findAll);

router.post('/create', productController.create);

router.get('/:id', productController.findById);

router.put('/:id/update', productController.update);

router.delete('/:id/delete', productController.delete);

module.exports = router