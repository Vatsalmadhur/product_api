require("dotenv").config();
const connectDB = require("./db/connect")
const Product = require("./models/product")

const productJson = require('./products.json');
const start = async ()=>{
    try{
        await connectDB(process.env.MONGODB_URL);
        await Product.create(productJson);
        await Product.deleteMany();
        console.log("done,data added")
    } catch(err){
        console.log(err);
    }
}
start();