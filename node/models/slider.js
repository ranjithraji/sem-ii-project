const mongoose=require('mongoose');
var testSchema = new mongoose.Schema({
    src:String,
});

const Test=mongoose.model('users', testSchema);

module.exports= Test;
