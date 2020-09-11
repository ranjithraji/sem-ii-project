const mongoose = require('mongoose');
const Product = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
}
const User = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account'
}
const Address = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address'
}
const orderStatus = ['Ordered', 'Delivered', 'Cancelled']
const payment = ['Cash on Delivery', 'Debit Cards', 'Credit Cards']
var orderSchema = mongoose.Schema({
    orders: {
        type: [{product:[Product],productSize:String,quantity:Number}],
        required: true
    },
    user: [User],
    total: {
        type: Number,
        required: true
    },
    offer: {
        type: Number,
        required: true
    },
    deliveryCharge: {
        type: Number
    },
    address: Address,
    status: {
        type: String,
        enum: orderStatus,
        required: true
    },
    orderDate: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true,
        enum: payment
    },
    deliveredDate: {
        type: String,
        required: true
    },
    count:{
        type:Number,
        required:true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('order', orderSchema)