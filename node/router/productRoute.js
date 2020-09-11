const _ = require('lodash');
const express = require('express');
const router = express.Router();
const cors=require('cors');
const userController=require('../controller/userController')
router.use(cors())
router.post('/productIn',userController.ProductInsert);
router.get('/productGet',userController.ProductGet);
router.put('/productUpdate',userController.ProductUpdate);
router.delete('/productDelete',userController.ProductDelete);
router.post('/productFind',userController.ProductFind);
router.get('/productPage/:productCode',userController.ProductPage);

module.exports=router;