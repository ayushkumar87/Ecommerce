const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    stock:Number,
    category:String,
    image:{
        type:String,
    }
})
module.exports=mongoose.model("Product",productSchema)
