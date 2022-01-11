

const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

const Product=require('../Models/product.model');

async function getProducts(req,res){

    const products= await Product.findAll();

    res.render('customer-views/all-products',{products:products})

}


async function getProductDetails(req,res){

    const pid=req.params.id;

    const product = await Product.getAProduct(pid);

    res.render('customer-views/product-details',{product:product});

}

async function addItemToCart(req,res){

    const pid = req.body.pid;

    const product = await Product.getAProduct(pid);

    const cart = res.locals.cart;

    cart.addToCart(product);

    req.session.cart=cart;

    console.log(cart);

    req.session.save(function (){

    res.json({ message: "success" , totalQuantity:cart.totalQuantity});

    });

}


module.exports={
    getProducts:getProducts,
    getProductDetails:getProductDetails,
    addItemToCart:addItemToCart,
}