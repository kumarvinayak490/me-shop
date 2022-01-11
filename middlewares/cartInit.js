const Cart = require('../Models/cart.model');


function cartInit(req,res,next){

    let cart;

    if(!req.session.cart){

        cart = new Cart();
    }else{
        cart = new Cart(
          req.session.cart.items,
          req.session.cart.totalPrice,
          req.session.cart.totalQuantity,
        );
    }

    res.locals.cart=cart;

    next();

}

module.exports=cartInit;