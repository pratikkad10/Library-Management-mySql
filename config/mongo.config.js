//mongoDB connection
const mongoose=require('mongoose');
require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=> console.log("DB Connection Successful!"))
    .catch((err)=>{ 
        console.log("Error in DB connection!");
        console.error(err.message);
        process.exit(1);
    });    
}

module.exports = dbConnect;

