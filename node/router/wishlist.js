const _ = require('lodash');
const express = require('express');
const router = express.Router();
const cors=require('cors');
const userController=require('../controller/userController')
router.use(cors())

//wishlist api

//create wishlist
 router.post('/wishlistCreate',userController.CreateWishlist)

//wishlist get
router.post('/getAllWishlist',userController.getAllwishlist)

//wishlist delete
router.delete('/deleteWishlist',userController.DeleteWishlist)

//wishlist move to bag
router.post('/moveToBag',userController.moveToBag)

//bag to wishlist 
router.post('/moveBag',userController.BagCreateWishlist)
 module.exports=router