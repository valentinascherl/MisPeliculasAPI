const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productValidator = require('../middlewares/productValidator');

// GET routes
  router.get('/search', productController.searchByName); //search by name
  router.get('/:codigo', productController.productDetails);
  router.get('/', productController.productList);

// POST routes
  router.post('/', productValidator.create, productController.newProduct); //new product

// PUT routes
  router.put('/:codigo', productValidator.edit, productController.editProduct); //edit a product

// DELETE routes
   router.delete('/:codigo', productController.deleteProduct);

module.exports = router;
