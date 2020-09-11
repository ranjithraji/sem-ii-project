const _ = require('lodash');
const express = require('express');
const router = express.Router();
const cors=require('cors');
const userController=require('../controller/userController')

router.use(cors())
router.post('/login',userController.GetUser);
router.get('/profile',userController.UserProfile);
router.post('/register',userController.UserCreate);
router.put('/update',userController.UserUpdate);
 
module.exports = router; 