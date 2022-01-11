const express=require('express');

const adminController=require('../Controllers/admin.controller');
const extractFile = require("../middlewares/upload");

const router = express.Router();


router.get('/add-product',adminController.getAddProduct);

router.post('/manage-product',extractFile,adminController.manageProduct);

router.get('/product/:id/update', adminController.getUpdateProduct);

router.post("/update-product/:id", extractFile,adminController.updateProduct);

router.post('/delete/:id',adminController.deleteProduct);

router.post("/update-order-status",adminController.updateOrderStatus);

router.get("/orders", adminController.getAllOrders);


module.exports=router;