const Order=require('../Models/order.model');

const User=require('../Models/user.model');



async function createOrder(req,res){

const user = await User.findUserById(req.session.uid);

const cart = res.locals.cart;

const order= new Order(cart,user);

 const result= await order.save();

 req.session.cart=null;

res.redirect('/orders');


}


async function getOrders(req,res){

    const orders= await Order.findOrdersByUser(req.session.uid);

    res.render('orders/orders',{orders:orders});

}



module.exports={
    createOrder:createOrder,
    getOrders:getOrders,
}