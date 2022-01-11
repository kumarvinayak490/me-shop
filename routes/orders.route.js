const express = require("express");

const orderRoutesHandler = require("../Controllers/order.controller");

const router = express.Router();

router.post("/", orderRoutesHandler.createOrder);

router.get('/',orderRoutesHandler.getOrders);



module.exports = router;
