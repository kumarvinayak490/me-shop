const db=require('../data/database');

const mongodb=require('mongodb');

const ObjectId= mongodb.ObjectId;


class Product{



    constructor(product){

        this.title=product.title;
        this.price=+product.price;
        this.summary=product.summary;
        this.image=product.image;
        this.updateImageData();

        if(product._id){
            this._id= product._id.toString();
        }
    }


    static async findAll(){
        const products = await db.getDb().collection('products').find().toArray();

        return products.map(function (product){

             const productItem=new Product(product)

             return productItem;

        });
    }

    static async findMultiple(ids){


        const productIds = ids.map((productId)=>{

                return new ObjectId(productId);
        });


        const products = await db.getDb().collection('products').find({_id:{$in:productIds}}).toArray();

        return products.map((product)=>{
            return new Product(product);
        });
    }

    static async getAProduct(id){

        const pid=new ObjectId(id);

        const product = await db.getDb().collection('products').findOne({_id:pid})

        const productItem = new Product(product);

        return productItem;
    }

    static async deleteProduct(pid){

        const id = new ObjectId(pid);

        await db.getDb().collection('products').deleteOne({_id:id});
    }

    updateImageData(){
          this.imagePath = `product-data/images/${this.image}`;
          this.imageURL = `/products/assets/images/${this.image}`;
    }

    async save(){

        const productData = {
            title:this.title,
            price:this.price,
            summary:this.summary,
            image:this.image,
        }

        if(this._id){

            const  pid = new ObjectId(this._id);
            if(!productData.image){
                delete productData.image;
            }

            await db.getDb().collection("products").updateOne({_id:pid},{$set:productData});
        } else {
             await db.getDb().collection("products").insertOne(productData);
        } 
    }

    updateImage(image){
        this.image=image;
        this.updateImageData();
    }

}

module.exports=Product;