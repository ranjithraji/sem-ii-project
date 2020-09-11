const mongoose=require('mongoose');
const Product={
    type:mongoose.Schema.Types.ObjectId,
    ref:'products'
}
const User={
    type:mongoose.Schema.Types.ObjectId,
    ref:'account'
}
var wishListSchema=mongoose.Schema({
    product:[Product],
    user:[User]
})
module.exports=mongoose.model('wishlist',wishListSchema)