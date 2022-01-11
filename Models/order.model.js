const db=require('../data/database');

class Order{


    constructor(cart,userData,date,orderId,status='pending'){

        this.productData=cart;
        this.userData=userData;
        this.date= new Date(date);
        this.formattedDate=this.date.toLocaleDateString('en-US',{
            weekday:'short',
            month:'long',
            day:'numeric',
            year:'numeric'
        });
        this.orderId=orderId;
        this.status=status;
    }

    static transformOrder(order){
        return new Order(
          order.productData,
          order.userData,
          order.date,
          order._id,
          order.status
        );
    }

    static transformOrders(orders){
        return orders.map(this.transformOrder);
    }

    static async findOrdersByUser(uid){

       const orders =  await db.getDb().collection('orders').find({'userData._id':uid}).sort({_id:-1}).toArray();

       return this.transformOrders(orders);
    }

    static async findAllOrders(){

            const orders = await db.getDb().collection('orders').find().sort({_id:-1}).toArray();

            return this.transformOrders(orders);
    }

    static async findByOrderId(orderId){
        
        const order = await db.getDb().collection('orders').findOne({_id:orderId});

        return this.transformOrder(order);
    }



    save(){

        if(this.orderId){

             return db.getDb().collection('orders').updateOne({_id:this.orderId},{$set :{status:this.status}});

        }else{

            const orderDocument={
            productData:this.productData,
            userData:this.userData,
            date: new Date(),
            status:this.status,
        }
            return db.getDb().collection('orders').insertOne(orderDocument);
        }
    }
}


module.exports=Order;