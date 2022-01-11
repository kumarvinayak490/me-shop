const express = require("express");

const cartRoutesHandler = require("../Controllers/cart.controller");

const router = express.Router();

router.get('/products',cartRoutesHandler.getCartItems);

router.post('/update-item',cartRoutesHandler.updateCartItemQuantity);




module.exports=router;
