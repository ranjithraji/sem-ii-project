const _ = require('lodash');
const express = require('express');
const router = express.Router();
const cors=require('cors');
const userController=require('../controller/userController')
router.use(cors())
 /*post your data*/
 router.post('/bagCreate',userController.BagAdd);

 /*get your bag data*/
 router.post('/bagGetAll',userController.GetALLBag);

 /*update your bag data*/
 router.put('/bagUpdate',userController.Putbag);

/*delete your bag data*/
router.delete('/bagDelete',userController.DeleteBag);

/*get count the bag*/

router.get('/getCount/:token',userController.countCart)

 module.exports=router