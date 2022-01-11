const Product = require('./product.model');

class Cart{


    constructor(items=[],totalPrice=0,totalQuantity=0){

        this.items=items;
        this.totalPrice=totalPrice;
        this.totalQuantity=totalQuantity;

    }


    async updatePrice(){

        const productIds=this.items.map( (item) => item.product._id)

        const products = await Product.findMultiple(productIds);

        const deletableProducts=[];

        for ( let cartItem of this.items){

            const product = products.find((prod)=>{

                return cartItem.product._id===prod._id;
            });

            if(!product){
                deletableProducts.push(cartItem.product._id);
                continue;
            }


            cartItem.product=product;
            cartItem.totalPrice=cartItem.quantity*cartItem.product.price;
        }

        if(deletableProducts.length > 0){
            this.items=this.items.filter((item)=>{

                return deletableProducts.indexOf(item.product._id)<0;
            });
        }

        this.totalQuantity=0;
        this.totalPrice=0;

        for (let item of this.items){

            this.totalQuantity+=item.quantity;
            this.totalPrice+=item.totalPrice;
        }

    }


    addToCart(product){

        const cartItem={
            product:product,
            quantity:1,
            totalPrice:product.price,
        }

        

        for(let i=0;i<this.items.length;i++){

            if(this.items[i].product._id==product._id){

                cartItem.quantity= +this.items[i].quantity+1;
                cartItem.totalPrice += this.items[i].totalPrice;
                this.items[i]=cartItem;
                this.totalPrice += product.price;
                this.totalQuantity++;
                return;
            }

        }

        this.items.push(cartItem);
        this.totalPrice += cartItem.totalPrice;
        this.totalQuantity++;
    }


    updateCartItem(pid,quantity){

        
          for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.product._id == pid) {

                if (quantity > 0) {
                  const cartItem = { ...item };
                  let quantityChange = quantity - item.quantity;
                  cartItem.quantity += quantityChange;
                  cartItem.totalPrice += quantityChange * item.product.price;
                  this.items[i] = cartItem;
                  this.totalPrice += quantityChange * item.product.price;
                  this.totalQuantity += quantityChange;
                  return { updatedItemPrice: cartItem.totalPrice };
                } else if (quantity === 0 || quantity < 0) {
                  this.items.splice(i, 1);
                  this.totalPrice -= item.quantity * item.product.price;
                  this.totalQuantity -= item.quantity;
                  return { updatedItemPrice: 0 };
                }
            }
     }

    }

}


module.exports=Cart;