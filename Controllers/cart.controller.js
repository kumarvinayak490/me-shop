
function getCartItems(req,res){

    res.render('customer-views/cart-details');

}

function updateCartItemQuantity(req,res){

    const pid=req.body.pid;

    const quantity= +req.body.quantity;

    const cart = res.locals.cart;

    const updatedItemPrice= cart.updateCartItem(pid,quantity);

    req.session.cart=cart;

    req.session.save(function(){

         console.log(cart);

    });

    res.json({message:'updated',
    totalPrice:cart.totalPrice.toFixed(2),
    totalQuantity:cart.totalQuantity,
    updatedItemPrice:updatedItemPrice.updatedItemPrice,
});
}


module.exports = {
  getCartItems: getCartItems,
  updateCartItemQuantity: updateCartItemQuantity,
};