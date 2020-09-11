const mongoose=require('mongoose');
const Product={
    type:mongoose.Schema.Types.ObjectId,
    ref:'products'
}
const User={
    type:mongoose.Schema.Types.ObjectId,
    ref:'account'
}
var bagSchema=mongoose.Schema({
    productSize:{
        type:String,
        required:true
    },
    product:[Product],
    user:[User],
    quantity:{
        type:Number,
        required:true,
        default:1
    }
})
module.exports=Bag=mongoose.model('bag',bagSchema);