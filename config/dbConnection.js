const mongoose = require('mongoose');

const connectDB = async () => {
try{
const connect = await mongoose.connect(process.env.CONNECTION_STRING);
console.log('Connected to MongoDB' , connect.connection.host);
}catch(err){
    console.log(err);
    process.exit(1);
}
};

module.exports = connectDB;