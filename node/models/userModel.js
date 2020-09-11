const Joi = require('joi');
const mongoose = require('mongoose');
var Bag={
    type:mongoose.Schema.Types.ObjectId,
    ref: 'bag',
}
var address={
    type:mongoose.Schema.Types.ObjectId,
    ref:'address'
}
var order={
    type:mongoose.Schema.Types.ObjectId,
    ref:'order'
}
var Wish={
    type:mongoose.Schema.Types.ObjectId,
    ref:'wishlist'
}
const User = mongoose.model('account', new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required:true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
     phone:{
        type:Number,
        required:true,
        minlength:10
    },
    first_name:{type:String},
    last_name:{type:String},
    location:{type:String},
    usertype:{
        type:String
    },
    bag:[Bag],
    address:[address],
    order:[order],
    wish:[Wish],
}  ,{
    timestamps:true
}));
 
function validateUser(user) {
    const schema = {
        name:Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
        phone:Joi.number().min(10).required(),
        usertype:Joi.string()
    };
    return Joi.validate(user, schema);
}
 
exports.User = User;
exports.validate = validateUser;