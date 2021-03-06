const mongoose=require('mongoose');

var ProductSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true,
        maxlength:255,
        minlength:5
    },
    description:{
        type:String,
        required:true,
        maxlength:255,
        minlength:5
    },
    image:{
        type:[],
        required:true
    },
    size:{
        type:Array,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productType:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    by:{
        type:String,
        required:true
    },
    offers:{
        type:Number,
        required:true
    },
    productCode:{
        type:Number,
        required:true
    }
});
module.exports=Procduct=mongoose.model('products',ProductSchema);