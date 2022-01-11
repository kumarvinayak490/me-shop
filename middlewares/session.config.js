const mongostore=require('connect-mongodb-session');
const session= require('express-session');



function createSessionStore(){

    const MongoDbStore = mongostore(session);

    const store=new MongoDbStore({
        uri:'mongodb://localhost:27017',
        databaseName:'me-shop',
        collection:'session'
    });

    return store;
}


function createSessionConfig(){

    return {
        secret:'vinayak-secret',
        resave:false,
        saveUninitialized:false,
        store:createSessionStore(),
        cookie:{
            maxAge: 2*24*60*60*1000,
        }
    };
}


module.exports=createSessionConfig;

