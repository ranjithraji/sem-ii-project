const _ = require('lodash');
const express = require('express');
const router = express.Router();
const cors=require('cors');
const userController=require('../controller/userController')
router.use(cors())

//order api

// post the order

router.post('/CreateOrder',userController.CreateOrder)

//get All order

router.get('/GetAllOrder',userController.GetALLOrder)

//delete order

router.delete('/DeleteOrder',userController.DeleteOrder)

//update order

router.put('/UpdateOrder',userController.putOrder)

//product order by Id

router.post('/getOrder/:_id/:product',userController.getByProduct)
module.exports=router