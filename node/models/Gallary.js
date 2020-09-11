const mongoose=require('mongoose');
var cardSchema = new mongoose.Schema({
    cardSrc:String,
    route:String
});

const Card=mongoose.model('gallary', cardSchema);

module.exports=Card;