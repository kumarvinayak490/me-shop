const express = require("express");

const customerRoutesHandler = require("../Controllers/customer.controller");

const router = express.Router();

router.get('/products',customerRoutesHandler.getProducts);

router.get('/product/:id/details',customerRoutesHandler.getProductDetails);

router.post('/add-item-to-cart',customerRoutesHandler.addItemToCart);

module.exports = router;
