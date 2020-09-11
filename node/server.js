const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
 const bodyParser=require('body-parser');
const app = express();

var dbURI = 'mongodb://localhost:27017/img';
//Connect with the database

//Bodyparser Middleare
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true}));


 //Define Line Middleares
app.use(cors());


const port = 5000;

// //String  in the user router
// const users=require('./router/router');
//  app.use('/api/router',users);
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex', true);
mongoose.connect(dbURI ,{ useNewUrlParser: true, useUnifiedTopology: true  }).then(data=>{
    console.log('database connected successfully')
}).catch(err=>{
    console.log('database connection err')
})

const users=require('./router/slider');
const login=require('./router/userLogin');
const gallary=require('./router/gallary');
const product=require('./router/productRoute')
const bag=require('./router/bag');
const address=require('./router/address')
const order=require('./router/order')
const wish=require('./router/wishlist')
app.use('/user',login);
 app.use('/api',users);
 app.use('/ga',gallary);
 app.use('/pro',product);
 app.use('/bag',bag);   
 app.use('/address',address)
app.use('/order',order)
app.use('/wish',wish)
app.listen(port, () => console.log(`Server running on port ${port}`));