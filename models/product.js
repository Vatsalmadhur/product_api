const mongoose=require("mongoose");

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:[true,"price must be given"],
    },
    featured:{
        type:Boolean,
        default: false,
    },
    rating:{
        type:Number,
        default:4.9,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type:String,
        enum:{
            values:["apple","samsung","realme","xiaomi"],
            message:`{VALUE} is not suppported`
        }
    }
});

module.exports=mongoose.model("Product",productSchema);