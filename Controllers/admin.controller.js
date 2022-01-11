

const mongodb=require('mongodb')
const Product = require('../Models/product.model');
const Order = require('../Models/order.model');

const ObjectId = mongodb.ObjectId;

function getAddProduct(req,res){

res.render('admin-views/add-product', {product:{
    title:'',
    price:'',
    summary:'',
}});

}


async function manageProduct(req,res){

    const productData = {
        ...req.body,
        image:req.file.filename,
    }

    const product = new Product(productData);

    await product.save();
    res.redirect('/');
}

async function getUpdateProduct(req,res){

    const id = req.params.id;

    const product= await Product.getAProduct(id);

    res.render("admin-views/update-product",{product:product});
}


async function updateProduct(req,res){

     const productData = {
       ...req.body,
       _id: req.params.id,
     };

     console.log('update product');

     const product = new Product(productData);

     if(req.file){
        product.updateImage(req.file.filename);
     }

     await product.save();

     res.redirect('/');

}

async function deleteProduct(req,res){

    pid=req.params.id

    console.log(pid);

    await Product.deleteProduct(pid);

    res.json({message:'successful'});
}

async function getAllOrders(req,res){

    const orders = await Order.findAllOrders();

    res.render('orders/orders',{orders:orders});

}


async function updateOrderStatus(req,res){

    const orderId=new ObjectId(req.body.orderId.trim());

    const order= await Order.findByOrderId(orderId);

   order.status=req.body.status;

   await order.save()

    res.json({message:'Updated',status:order.status});

}


module.exports = {
  getAddProduct: getAddProduct,
  manageProduct: manageProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  updateOrderStatus: updateOrderStatus,
  getAllOrders: getAllOrders,
};