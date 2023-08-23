const mongodb = require('mongodb')
const mongoose = require('mongoose');

const connectionString = 'mongodb://0.0.0.0:27017/Testing'; 



const connectToMongo = async () =>{
    mongoose.connect(connectionString);

    const conn = mongoose.connection

    conn.on('open', () => {
        console.log('Connect')
    })
}

module.exports = connectToMongo 