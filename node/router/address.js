const _ = require('lodash');
const express = require('express');
const router = express.Router();
const cors=require('cors');
const userController=require('../controller/userController')
router.use(cors())

// post the address 
router.post('/AddressCreate',userController.createAddress);

// get all the address
router.get('/GetAllAddress',userController.GetAllAddress);
// get  the address
router.post('/GetAddress',userController.GetAddress);

//Update the address collection
router.put('/UpdateAddress',userController.UpdateAddress);

//Delete the address
router.delete('/DeleteAddress',userController.DeleteAddress);

module.exports=router