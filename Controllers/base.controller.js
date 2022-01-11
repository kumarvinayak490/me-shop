const Product=require('../Models/product.model');

async function getHomePage(req,res){

    const products= await Product.findAll();

    res.render('shared-views/base', {products:products});

}


module.exports={
    getHomePage:getHomePage,
}