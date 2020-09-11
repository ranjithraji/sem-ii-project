const _ = require('lodash');
const express = require('express');
const router = express.Router();
const cors=require('cors');
const userController=require('../controller/userController')
router.use(cors())
router.get('/cardget',userController.CardGet);
router.post('/cardIn',userController.CardIn);

module.exports=router