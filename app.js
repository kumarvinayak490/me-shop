const path=require("path");
const express = require('express');
const session=require('express-session');
const db=require('./data/database');
const createSessionConfig=require('./middlewares/session.config');
const checkAuth=require('./middlewares/checkAuth');
const protectRoute=require('./middlewares/protect-route');
const cartInit=require('./middlewares/cartInit');
const updateCartPrice=require('./middlewares/update-price');


const authRoutes=require('./routes/auth.route');
const baseRoutes=require('./routes/base.route');
const adminRoutes=require('./routes/admin.route');
const customerRoutes=require('./routes/customer.route');
const cartRoutes=require('./routes/cart.route');
const orderRoutes=require('./routes/orders.route');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static('Public'));
app.use('/products/assets',express.static('product-data'));

app.set('view engine', 'ejs' );
app.set('views', path.join(__dirname,'Views'));

const sessionConfig=createSessionConfig();

app.use(session(sessionConfig));

app.use(cartInit);
app.use(updateCartPrice);

app.use(checkAuth);

app.use(authRoutes);
app.use(baseRoutes);
app.use(customerRoutes);
app.use('/cart',cartRoutes);
app.use(protectRoute);
app.use('/admin',adminRoutes);
app.use('/orders',orderRoutes);


db.connectToDatabase().then(function (){

app.listen(3000);

});



