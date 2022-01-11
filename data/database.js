const mongoDb=require('mongodb');

const MongoClient=mongoDb.MongoClient;

let database;

async function connectToDatabase(){

    const client= await MongoClient.connect('mongodb://localhost:27017');
    database=client.db('me-shop');
}

function getDb(){
    if(!database){
        throw{message:'Unable to connect'}
    }

    return database;
}

module.exports={
    connectToDatabase:connectToDatabase,
    getDb:getDb,
}

