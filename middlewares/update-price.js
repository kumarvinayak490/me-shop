async function updateCartPrice(req,res,next){


    const cart = res.locals.cart;

    await cart.updatePrice();

    next();

}

module.exports=updateCartPrice;