const mongoose=require('mongoose');
const User={
    type:mongoose.Schema.Types.ObjectId,
    ref:'account'
}
const place=['Home','Work']
const work=['SATURDAY','SUNDAY']
var addressSchema=mongoose.Schema({
    user:User,
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    pinCode:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    place:{
        type:String,
        enum:place
    },
    workingHour:{
        type:String,
        enum:work
    }
})
module.exports=mongoose.model('address',addressSchema)