const express = require('express');
const router=express.Router();
const Test =require('../models/slider');
const Controller=require('../controller/userController')

const app=express();
router.get('/customers', Controller.GetSlider);
router.post('/in',Controller.InsertSlider);
router.delete("/de/:id",Controller.DeleteSlider);
module.exports=router;