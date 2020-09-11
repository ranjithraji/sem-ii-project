const { User, validate } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const Test = require('../models/slider');
const Card = require('../models/Gallary');
const Product = require('../models/productModle');
const Bag = require('../models/bagModel');
const Address = require('../models/addressModel')
const Order = require('../models/orderSchema')
const Wishlist = require('../models/wishlistModel')
//Slider modules

/*slider inserting module*/
module.exports.InsertSlider = async function (req, res) {
  var myData = new Test(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.send("unable to save to database", err);
    });
}
/*get  slider module*/
module.exports.GetSlider = async function (req, res) {
  Test.find({}, function (err, docs) {
    const imgs = docs;
    res.json(imgs);
  });
}
/*slider deletion module*/
module.exports.DeleteSlider = async function (req, res, next) {
  Test.findOneAndDelete(req.params.id, function (err, output) {
    if (err) {
      return next(err);
    }
    res.send({ message: "delete successfully", user: output });
  });
}

//User Modules

/* Create user module */
module.exports.UserCreate = async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
    return res.send({ message: error.details[0].message });
  }

  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.send({ message: 'That user already exisits change your email ID!' });
  } else {
    let user = await User.findOne({ phone: req.body.phone });
    if (user) {
      return res.send({ message: 'That phone already exisits change your phone' });
    } else {
      let user = await User.findOne({ name: req.body.name });
      if (user) {
        return res.send({ message: 'That username already exisits change your username' });
      } else {

        // Insert the new user if they do not exist yet
        type = req.body.usertype
        if (type == null || type == undefined) {
          type = "user"
        }
        else {
          if (type == 'Delivery') {
            type = "Delivery"
          }
          else {
            type = "admin"
          }
        }
        user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          usertype: type
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send({ message: 'ok', data: user });
      }
    }
  }
}

/* login user module */
module.exports.GetUser = async (req, res) => {
  // First Validate The HTTP Request
  const { error } = validates(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }

  //  Now find the user by their email address
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.send('Incorrect email or password.');
  }

  // Then validate the Credentials in MongoDB match
  // those provided in the request
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.send({ message: 'Incorrect email or password.' });
  }
  else {
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      address: user.address,
      bag: user.bag,
      location:user.location

    }
    const token = jwt.sign(payload, 'secret', {
      expiresIn: 1800000
    });
    res.send({ message: 'hi', data: token });
  };
  function validates(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
  }
}

/*get user module */
module.exports.UserProfile = (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], 'secret')

  User.findOne({
    _id: decoded._id
  }).populate('bag').then(user => {
    if (user) {
      res.json(user)
    } else {
      res.send('User does not exist')
    }
  }).catch(err => {
    res.send('error: ' + err)
  })

};

/* update user module */
module.exports.UserUpdate = async function (req, res) {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')


  const user1 = {
    name: req.body.name,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    dob: req.body.dob,
    location: req.body.location
  }

  User.findOne({
    _id: decoded._id
  }, async (err, user) => {
    if (user) {
      if (user1.phone) {
        let user = await User.findOne({ phone: req.body.phone });
        if (user) {
          return res.send({ message: 'That phone no already exisits change your phone' });
        } else {
          var phone = String(user1.phone)
          var len = phone.length
          if (len == 10) {
            User.updateOne({ _id: decoded._id }, { $set: user1 }).then(data => {
              return res.json({ message: 'ok', data: data })
            }).catch(err => {
              console.log(err)
            });
          }
          else {
            return res.send({ message: 'That phone no was invalid change your phone no' });
          }
        }
      }
      else{
        User.updateOne({ _id: decoded._id }, { $set: req.body }).then(data => {
          return res.json({ message: 'ok', data: data })
        }).catch(err => {
          console.log(err)
        });
      }
    } else {
      res.send({ message: 'User does not exist' })
    }
  }).catch(err => {
    res.send('error: ' + err)
  })

}

//gallary module


/*gallary create module*/
module.exports.CardIn = function (req, res) {
  var myData = new Card(req.body);
  myData.save()
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.send("unable to save to database", err);
    });
}


/* Gallary get module */
module.exports.CardGet = (req, res) => {
  Card.find({}, (err, data) => {
    const card = data;
    res.json(card);
  })
}

//Product module

/* product creation module*/
module.exports.ProductInsert = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], 'secret')
  User.findOne({
    _id: decoded._id,
    usertype: "admin"
  }).then(data => {
    if (data) {
      Product.findOne({
        productCode: req.body.productCode
      }).then(data => {
        if (data) {
          return res.send('That productCode already exisits change your product!');
        } else {
          var product = new Product({
            user: decoded._id,
            username: decoded.name,
            productname: req.body.productname,
            description: req.body.description,
            image: req.body.image,
            size: req.body.size,
            price: req.body.price,
            productType: req.body.productType,
            brand: req.body.brand,
            color: req.body.color,
            by: req.body.by,
            productCode: req.body.productCode,
            offers: req.body.offers
          });
          Product.create(product)
            .then(item => {
              res.json(item)
            }).catch(err => {
              res.send(err);
            })
        }
      }).catch(err => {
        res.json(err);
      })
    } else {
      return res.send('unable to save to database because your not  a admin');
    }
  }).catch(err => {
    res.json(err);
  })
}

/* product get by productname module*/

module.exports.ProductGet = async (req, res) => {
  Product.find({}, (err, docs) => {
    const product = docs;
    res.json(product)
  }).catch(err => {
    res.json(err)
  })
}

/* product update module*/

module.exports.ProductUpdate = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], 'secret')
  User.findOne({
    _id: decoded._id, usertype: "admin"
  }).then(data => {
    if (data) {
      if (req.body.id == null || req.body.id == undefined) {
        return res.send('product id was missing');
      } else {
        if (req.body.productCode == null || req.body.productCode == undefined) {
          return res.send('product code was missing');
        } else {
          Product.updateOne({
            _id: req.body.id,
            user: decoded._id,
            productCode: req.body.productCode
          }, {
            $set: req.body
          }, {
            new: true
          }, (err, data) => {
            if (err) {
              return res.json('product not exit');
            } else {
              return res.status(200).send({
                message: "update product successfully",
                data: data
              });
            }
          }).catch(err => {
            res.json(err)
          })
        }
      }
    } else {
      return res.send('unable to save to database because your not  a admin');
    }
  }).catch(err => {
    res.json(err);
  })
}

/*product deletion module*/

module.exports.ProductDelete = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], 'secret')
  User.findOne({
    _id: decoded._id, usertype: "admin"
  }).then(data => {
    if (data) {
      if (req.body.id == null || req.body.id == undefined) {
        return res.send('product id was missing');
      } else {
        if (req.body.productCode == null || req.body.productCode == undefined) {
          return res.send('product code was missing');
        } else {
          Product.deleteOne({
            _id: req.body.id,
            user: decoded._id,
            productCode: req.body.productCode
          }, (err, data) => {
            if (err) {
              return res.json('product not exit');
            } else {
              return res.status(200).send({
                message: "product deleted successfully",
                data: data
              });
            }
          })
        }
      }

    }
    else {
      return res.send('unable to save to database because your not  a admin');
    }
  })
    .catch(err => {
      res.json(err);
    })
}

/*product get by methods*/

module.exports.ProductFind = async (req, res) => {
  Product.find(req.body, (err, docs) => {
    const product = docs;
    res.json(product)
  }).catch(err => {
    res.json(err)
  })
}

/*product find for product page*/

module.exports.ProductPage = async (req, res) => {
  if (!req.params.productCode) {
    res.send('Product code was most to get your product')
  }
  else {
    const productCode = req.params.productCode
    Product.find({ productCode: productCode }, (err, docs) => {
      const product = docs;
      res.json(product)
    }).catch(err => {
      res.json(err)
    })
  }
}



/*bag api*/

/*product add to bag*/

module.exports.BagAdd = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      if (req.body.productSize == '' || req.body.productSize == 'undefine') {
        res.send('Product size was most to add your product into bag')
      }
      else {
        if (req.body.product == '' || req.body.product == 'undefine') {
          res.send('Product id was most to add your product into bag')
        }
        else {
          Product.findOne({ _id: req.body.product }).then(pro => {
            if (pro) {
              // Bag.findOne({ product: req.body.product, user: decoded._id }).then(bagdata => {
              //   if (!bagdata) {
                  const bags = new Bag({
                    productSize: req.body.productSize,
                    product: pro,
                    user: data,
                    quantity: req.body.quantity
                  })
                  bags.save({}, (err, data) => {
                    if (err) {
                      return res.send({ message: 'samthing wrong to find your product', error: err })
                    }
                    else {
                      Bag.find({ user: decoded._id }, async (err, data) => {
                        if (!err) {
                          await User.updateOne({ _id: decoded._id }, { $set: { bag: data } })
                        }
                        else {
                          return res.send({ message: 'samthing wrong to find your product', error: err })
                        }
                      })
                      return res.status(200).send({ message: 'product added in your bag successfully', bag: data })
                    }
                  })
                }
                else {
                  Bag.find({ product: req.body.product, user: decoded._id }, async (err, data) => {
                    if (!err) {
                      return res.status(200).send({ message: 'product already added in your bag successfully', bag: data })
                    }
                    else {
                      return res.send({ message: 'samthing wrong to find your product', error: err })
                    }
                  })
                }
              }).catch(err => {
                return res.send({ message: 'samthing wrong to find your bag', error: err })
              })
            //}
          //   else {
          //     return res.send({ message: 'Product is not there check your product id' })
          //   }
          // }).catch(err => {
          //   return res.send({ message: 'samthing wrong to find your product', error: err })
          // })
        }
      }
    }
    else {
      return res.send({ message: "sorry  you are not a user" })
    }
  }).catch(err => {
    return res.send({ message: 'cannot find your account', error: err });
  })
}

/*get your bag data*/

module.exports.GetALLBag = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      Bag.find({ user: decoded._id })
        .populate('product')
        .then(data => {
          return res.status(200).send({ status: true, message: 'this is your bag', data: data });
        })
        .catch(err => {
          return res.send({ message: 'samething wrong to find your bag', error: err });
        })
    }
    else {
      return res.send({ message: 'sorry  you are not a user', error: err });
    }
  }).catch(err => {
    return res.send({ message: 'something wrong to find your account', error: err });
  })

}

/*update the bag data*/

module.exports.Putbag = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  var bag

  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      if (req.body.quantity == '' || req.body.quantity == undefined) {
        return res.send({ message: 'quanity is must to update your', error: err });
      }
      else {
        if (req.body.quantity) {
          console.log('productSize', req.body.quantity);
          bag = { quantity: req.body.quantity }
        }
        if (req.body.productSize) {
          bag = { productSize: req.body.productSize }
        }

        Bag.updateOne({ _id: req.body._id, user: decoded._id }, { $set: bag })
          .then(data => {
            Bag.find({ _id: req.body._id, user: decoded._id }, async (err, data) => {
              if (!err) {
                await User.updateOne({ _id: decoded._id }, { $set: { bag: data } })
                Bag.find({ user: decoded._id })
                  .populate('product')
                  .then(data => {
                    return res.status(200).send({ status: true, message: 'this is your bag', data: data });
                  })
                  .catch(err => {
                    return res.send({ message: 'samething wrong to find your bag', error: err });
                  })
              }
            })
          })
          .catch(err => {
            return res.send({ message: 'samething wrong to find your bag', error: err });
          })
      }
    }
    else {
      return res.send({ message: 'sorry  you are not a user', error: err });
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })


}


/*delete the bag data*/

module.exports.DeleteBag = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data) {
      Bag.findOne({ _id: req.body._id, product: req.body.product, user: decoded._id }, (err, data) => {
        if (data) {
          Bag.deleteOne({ _id: req.body._id, product: req.body.product, user: decoded._id })
            .then(data => {
              Bag.find({ user: decoded._id }, async (err, data) => {
                if (!err) {
                  await User.updateOne({ _id: decoded._id }, { $set: { bag: data } })
                }
                else {
                  return res.send({ message: 'samthing wrong to find your product', error: err })
                }
              })
            })
          return res.status(200).send({ status: true, message: 'deleted successfully', data: data });
        }
        else {
          return res.send({ message: 'cannot find your account', error: err });
        }
      })
        .catch(err => {
          return res.send({ message: 'samething wrong to find your bag', error: err });
        })
    }
    else {
      return res.send({ message: 'cannot find your account', error: err });
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })

}

//count the cart product
module.exports.countCart = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.params.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data) {
      Bag.countDocuments({ user: decoded._id })
        .then(data => {
          return res.status(200).send({ status: true, message: 'this is your bag', count: data });
        })
        .catch(err => {
          return res.send({ message: 'samething wrong to find your bag', error: err });
        })
    }
    else {
      return res.send({ message: 'cannot find your account', error: err });
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })

}

//address  api

//address create api

module.exports.createAddress = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  var address
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      if (req.body.name == '' || req.body.name == undefined) {
        return res.send({ message: 'name is must to create your address colletion' })
      }
      else {
        var name = String(req.body.name)
        if (name.length <= 5) {
          return res.send({ message: 'name is must have more then 5 letters' })
        }
        else {
          if (req.body.mobile == '' || req.body.mobile == undefined) {
            return res.send({ message: 'phone number is must to create your address colletion' })
          }
          else {
            var phone = new String(req.body.mobile)
            var phoneCheck = Number(phone)
            if (isNaN(phoneCheck)) {
              return res.send({ status: true, message: 'phone number is invalid be number only' })
            }
            else {
              if (phone.length == 10) {
                req.body.mobile = req.body.mobile;
              }
              else {
                return res.send({ status: true, message: 'phone number is invalid' })
              }
              if (req.body.pinCode == '' || req.body.pinCode == undefined) {
                return res.send({ message: 'pincode is must to create your address colletion' })
              }
              else {
                var pincode = new String(req.body.pinCode)
                var pinCheck = Number(pincode)
                if (isNaN(pinCheck)) {
                  return res.send({ status: true, message: 'pincode number is invalid be number only' })
                }
                else {
                  if (pincode.length == 6) {
                    var pin = Math.floor(pincode / 100000)
                    console.log(pin)
                    if (pin != 6) {
                      return res.send({ status: true, message: 'sorry this location not have delivery option' })
                    }
                    else {
                      req.body.pinCode = pincode
                    }
                  }
                  else {
                    return res.send({ status: true, message: 'pincode number is invalid' })
                  }
                  if (req.body.address == '' || req.body.address == undefined) {
                    return res.send({ message: 'address is must to create your address colletion' })
                  }
                  else {
                    var add = String(req.body.address)
                    if (add.length <= 20) {
                      return res.send({ message: 'please enter more address details ' })
                    }
                    else if (req.body.locality == '' || req.body.locality == undefined) {
                      return res.send({ message: 'locality or town is must to create your address colletion' })
                    }
                    else if (req.body.city == '' || req.body.city == undefined) {
                      return res.send({ message: 'city is must to create your address colletion' })
                    }
                    else if (req.body.state == '' || req.body.state == undefined) {
                      return res.send({ message: 'state is must to create your address colletion' })
                    }
                    else if (req.body.place == '' || req.body.place == undefined) {
                      return res.send({ message: 'place is must to create your address colletion' })
                    }
                    if ((req.body.place != 'Home') && (req.body.place != 'Work')) {
                      return res.send({ message: 'place is mention be like this Home ,Work' })
                    }
                    else {
                      if (req.body.place == 'Work') {
                        if (req.body.workingHour == '' || req.body.workingHour == undefined) {
                          return res.send({ message: 'working hour is must' })
                        }
                        else {
                          if ((req.body.workingHour != 'SATURDAY') && (req.body.workingHour != 'SUNDAY')) {
                            return res.send({ message: 'working hour is must being like this SATURDAY and SUNDAY ' })
                          }
                          else {
                            address = new Address({
                              name: req.body.name,
                              mobile: req.body.mobile,
                              pinCode: req.body.pinCode,
                              address: req.body.address,
                              locality: req.body.locality,
                              city: req.body.city,
                              state: req.body.state,
                              place: req.body.place,
                              user: decoded._id,
                              workingHour: req.body.workingHour
                            })
                          }
                        }
                      }
                      else if (req.body.place == 'Home') {
                        address = new Address({
                          name: req.body.name,
                          mobile: req.body.mobile,
                          pinCode: req.body.pinCode,
                          address: req.body.address,
                          locality: req.body.locality,
                          city: req.body.city,
                          state: req.body.state,
                          user: decoded._id,
                          place: req.body.place
                        })
                      }

                      Address.create(address).then(data => {
                        if (data) {
                          Address.find({ user: decoded._id }, async (err, add) => {
                            if (add) {
                              await User.updateOne({ _id: decoded._id }, { $set: { address: add } }).then(datas => {
                                if (datas) {
                                  return res.status(200).send({ message: 'address added successfully', data: data })
                                }
                                else {
                                  return res.send({ message: 'sorry I cannot update your in user collection' })
                                }
                              }).catch(err => {
                                return res.send({ message: 'samething wrong to find your account', error: err });
                              })
                            }
                            else {
                              return res.send({ message: 'sorry data cannot added in your address collection', error: err });
                            }
                          })
                            .catch(err => {
                              return res.send({ message: 'samething wrong to find your address', error: err });
                            })
                        }
                      })
                        .catch(err => {
                          return res.send({ message: 'samething wrong to create your address', error: err });
                        })

                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    else {
      return res.send({ message: 'sorry  you are not a user' })
    }
  })
    .catch(err => {
      return res.send({ message: 'samething wrong to find your account', error: err });
    })
}

//address get all api

module.exports.GetAllAddress = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')

  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      Address.find({ user: decoded._id }, async (err, add) => {
        if (add) {
          return res.status(200).send({ message: 'this is your address', data: add })
        }
        else {
          return res.send({ message: 'sorry data cannot added in your address collection', error: err });
        }
      })
        .catch(err => {
          return res.send({ message: 'samething wrong to find your address', error: err });
        })
    }
    else {
      return res.send({ message: 'sorry  you are not a user' })
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })

}

// address update api

module.exports.UpdateAddress = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  var address
  User.findOne({
    _id: decoded._id,
  }).then(user => {
    if (user.usertype == "user") {
      if (req.body.addressId == '' || req.body.addressId == undefined) {
        return res.send({ message: 'address id is must to update your address colletion' })
      }
      else {
        if (req.body.name == '' || req.body.name == undefined) {
          return res.send({ message: 'name is must to create your address colletion' })
        }
        else {
          var name = String(req.body.name)
          if (name.length <= 5) {
            return res.send({ message: 'name is must have more then 5 letters' })
          }
          else {
            if (req.body.mobile == '' || req.body.mobile == undefined) {
              return res.send({ message: 'name is must to create your address colletion' })
            }
            else {
              var phone = new String(req.body.mobile)
              var phoneCheck = Number(phone)
              console.log(phoneCheck)
              if (isNaN(phoneCheck)) {
                return res.send({ status: true, message: 'phone number is invalid be number only' })
              }
              else {
                if (phone.length == 10) {
                  req.body.mobile = req.body.mobile;
                }
                else {
                  return res.send({ status: true, message: 'phone number is invalid' })
                }
                if (req.body.pinCode == '' || req.body.pinCode == undefined) {
                  return res.send({ message: 'pincode is must to create your address colletion' })
                }
                else {
                  var pincode = new String(req.body.pinCode)
                  var pinCheck = Number(pincode)
                  if (isNaN(pinCheck)) {
                    return res.send({ status: true, message: 'pincode number is invalid be number only' })
                  }
                  else {
                    if (pincode.length == 6) {
                      var pin = Math.floor(pincode / 100000)
                      if (pin != 6) {
                        return res.send({ status: true, message: 'sorry this location not have delivery option' })
                      }
                      else {
                        req.body.pinCode = pincode
                      }
                    }
                    else {
                      return res.send({ status: true, message: 'pincode number is invalid' })
                    }
                    if (req.body.address == '' || req.body.address == undefined) {
                      return res.send({ message: 'address is must to create your address colletion' })
                    }
                    else {
                      var add = String(req.body.address)
                      if (add.length <= 15) {
                        return res.send({ message: 'please enter more address details ' })
                      }
                      else if (req.body.locality == '' || req.body.locality == undefined) {
                        return res.send({ message: 'locality or town is must to create your address colletion' })
                      }
                      else if (req.body.city == '' || req.body.city == undefined) {
                        return res.send({ message: 'city is must to create your address colletion' })
                      }
                      else if (req.body.state == '' || req.body.state == undefined) {
                        return res.send({ message: 'city is must to create your address colletion' })
                      }
                      else if (req.body.place == '' || req.body.place == undefined) {
                        return res.send({ message: 'place is must to create your address colletion' })
                      }
                      if ((req.body.place != 'Home') && (req.body.place != 'Work')) {
                        return res.send({ message: 'place is mention be like this Home ,Work' })
                      }
                      else {
                        if (req.body.place == 'Work') {
                          if (req.body.workingHour == '' || req.body.workingHour == undefined) {
                            return res.send({ message: 'working hour is must' })
                          }
                          else {
                            if ((req.body.workingHour != 'SATURDAY') && (req.body.workingHour != 'SUNDAY')) {
                              return res.send({ message: 'working hour is must being like this SATURDAY and SUNDAY ' })
                            }
                            else {
                              address = {
                                name: req.body.name,
                                mobile: req.body.mobile,
                                pinCode: req.body.pinCode,
                                address: req.body.address,
                                locality: req.body.locality,
                                city: req.body.city,
                                state: req.body.state,
                                place: req.body.place,
                                workingHour: req.body.workingHour
                              }
                            }
                          }
                        }
                        else if (req.body.place == 'Home') {
                          address = {
                            name: req.body.name,
                            mobile: req.body.mobile,
                            pinCode: req.body.pinCode,
                            address: req.body.address,
                            locality: req.body.locality,
                            city: req.body.city,
                            state: req.body.state,
                            place: req.body.place
                          }
                        }
                        console.log(address);
                        Address.updateOne({ user: decoded._id, _id: req.body.addressId }, { $set: address }).then(data => {
                          if (data) {

                            Address.findOne({ user: decoded._id, _id: req.body.addressId }, async (err, add) => {
                              if (add) {
                                return res.status(200).send({ message: 'address updated successfully', data: add })
                              }
                              else {
                                return res.send({ message: 'sorry data cannot update  your address collection', error: err });
                              }
                            })
                              .catch(err => {
                                return res.send({ message: 'samething wrong to find your address', error: err });
                              })
                          }
                        })
                          .catch(err => {
                            return res.send({ message: 'samething wrong to update your address', error: err });
                          })

                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    else {
      return res.send({ message: 'sorry  you are not a user' })
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })

}

//address delete api

module.exports.DeleteAddress = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype = "user") {
      if (req.body.addressId == '' || req.body.addressId == undefined) {
        return res.send({ message: 'address id is must to delete your address colletion' })
      }
      else {
        Address.find({ user: decoded._id, _id: req.body.addressId }, async (err, add1) => {
          if (add1) {
            Address.deleteOne({ user: decoded._id, _id: req.body.addressId }).then(data => {
              if (data) {
                Address.find({ user: decoded._id }, async (err, add) => {
                  if (add) {
                    await User.updateOne({ _id: decoded._id }, { $set: { address: add } }).then(datas => {
                      if (datas) {
                        return res.status(200).send({ message: 'address deleted successfully', data: add1 })
                      }
                      else {
                        return res.send({ message: 'sorry I cannot update your in user collection' })
                      }
                    }).catch(err => {
                      return res.send({ message: 'samething wrong to find your account', error: err });
                    })
                  }
                  else {
                    return res.send({ message: 'sorry data cannot added in your address collection', error: err });
                  }
                })
              }
              else {
                return res.send({ message: 'sorry data cannot delete', error: err });
              }
            })
              .catch(err => {
                return res.send({ message: 'samething wrong to find your address', error: err });
              })
          }
          else {
            return res.send({ message: 'sorry data cannot added in your address collection', error: err });
          }
        })
          .catch(err => {
            return res.send({ message: 'samething wrong to find your address', error: err });
          })
      }
    }
    else {
      return res.send({ message: 'sorry  you are not a user' })
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })
}
//address get by id all api

module.exports.GetAddress = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      if (req.body.addressId == '' || req.body.addressId == undefined) {
        return res.send({ message: 'address id is must to delete your address colletion' })
      }
      else {
        Address.find({ user: decoded._id, _id: req.body.addressId }, async (err, add) => {
          if (add) {
            return res.status(200).send({ message: 'this is your address', data: add })
          }
          else {
            return res.send({ message: 'sorry data cannot added in your address collection', error: err });
          }
        })
          .catch(err => {
            return res.send({ message: 'samething wrong to find your address', error: err });
          })
      }
    }
    else {
      return res.send({ message: 'sorry  you are not a user' })
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })

}

//order api

//create order api
module.exports.CreateOrder = async (req, res) => {
  // current timestamp in milliseconds
  let ts = Date.now();
  var product = [];
  var details = []
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let date1 = date_ob.getDate() + 4;
  let month = date_ob.getMonth();
  let month1 = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  // prints date & time in YYYY-MM-DD format
  const fdate = (date + " " + monthNames[month] + " " + year)
  let ddate
  console.log(date);

  if ((date1 >= 30)) {
    ddate = (4 + " " + monthNames[month1] + " " + year)
  }
  else {
    ddate = (date1 + " " + monthNames[month] + " " + year)
  }

  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype = "user") {
      if (req.body.addressId == '' || req.body.addressId == undefined || req.body.addressId == null) {
        return res.send({ message: 'address Id is must to post your order' })
      }
      else {
        if (req.body.total == '' || req.body.total == undefined || req.body.total == null) {
          return res.send({ message: 'total is must to post your order' })
        }
        else {
          if (req.body.offer == '' || req.body.offer == undefined || req.body.offer == null) {
            return res.send({ message: 'offer is must to post your order' })
          }
          else {
            if ((req.body.status != 'Ordered') && (req.body.status != 'Delivered') && (req.body.status != 'Cancelled')) {
              return res.send({ message: 'status is must be like this Ordered,Delivered' })
            }
            else if ((req.body.payment != 'Cash on Delivery') && (req.body.payment != 'Debit Cards') && (req.body.payment != 'Credit Cards')) {
              return res.send({ message: 'payment is must be like this Cash on Delivery,Debit Cards and Credit Cards' })
            }
            else {
              Order.findOne({}).sort({ "_id": -1 }).then(counted => {
                if (counted.count == null) {
                  req.body.count = 0
                }
                else {
                  req.body.count = counted.count + 1
                }
                console.log(counted);

                Bag.find({ user: decoded._id }, { _id: 0, product: 1, productSize: 1, quantity: 1 }).then(bag => {
                  if (bag) {
                    Bag.countDocuments({ user: decoded._id })
                      .then(data => {
                        for (i = 0; i < data; i++) {
                          product[i] = { product: bag[i].product, productSize: bag[i].productSize, quantity: bag[i].quantity }
                        }
                        console.log(product)
                        Address.findOne({ _id: req.body.addressId }, async (err, address) => {
                          if (address) {
                            var order
                            if (req.body.deliveryCharge) {
                              order = new Order({
                                orders: product,
                                user: decoded._id,
                                details: details,
                                address: address._id,
                                orderDate: fdate,
                                deliveredDate: ddate,
                                offer: req.body.offer,
                                total: req.body.total,
                                status: req.body.status,
                                payment: req.body.payment,
                                deliveryCharge: req.body.deliveryCharge,
                                count: req.body.count
                              })
                            }
                            else {
                              order = new Order({
                                orders: product,
                                user: decoded._id,
                                details: details,
                                address: address._id,
                                orderDate: fdate,
                                deliveredDate: ddate,
                                offer: req.body.offer,
                                total: req.body.total,
                                status: req.body.status,
                                payment: req.body.payment,
                                count: req.body.count
                              })

                            }
                            console.log(order);

                            order.save({}, (err, data) => {
                              if (err) {
                                return res.send({ message: 'samthing wrong to find your order', error: err })
                              }
                              else {
                                Order.find({ user: decoded._id }, async (err, data) => {
                                  if (!err) {
                                    await User.updateOne({ _id: decoded._id }, { $set: { order: data } })
                                    Bag.deleteMany({ user: decoded._id }).then(data => {
                                      if (data) {
                                        Bag.find({ user: decoded._id }, async (err, add) => {
                                          if (add) {
                                            await User.updateOne({ _id: decoded._id }, { $set: { Bag: add } })
                                          }
                                          else {
                                            return res.send({ message: 'sorry data cannot added in your address collection', error: err });
                                          }
                                        })
                                      }
                                      else {
                                        return res.send({ message: 'sorry data cannot', error: err });
                                      }
                                    })
                                      .catch(err => {
                                        return res.send({ message: 'samething wrong to find your address', error: err });
                                      })
                                  }
                                  else {
                                    return res.send({ message: 'samthing wrong to find your product', error: err })
                                  }
                                })
                                return res.status(200).send({ message: 'product added in your order successfully', order: data })
                              }
                            })
                          }
                          else {
                            res.send({ message: 'you dont have any address in your address', err: err })
                          }
                        }).catch(err => {
                          res.send({ message: 'somethin worng to find your address', err: err })
                        })
                      })
                      .catch(err => {
                        return res.send({ message: 'samething wrong to find your order', error: err });
                      })
                  }
                  else {
                    res.send({ message: 'you dont have any product in your order', err: err })
                  }
                })
                  .catch(err => {
                    res.send({ message: 'somethin worng to find your address', err: err })
                  })
              })
            }
          }
        }
      }
    }
    else {
      return res.send({ message: 'sorry  you are not a user' })
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })

}

//getall order in order
module.exports.GetALLOrder = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      Order.find({ user: decoded._id }, null, { sort: { status: -1 } }).populate('orders.product').populate('address').then(data => {
        if (data != '') {
          return res.status(200).send({ message: 'this is your order', order: data })
        }
        else {
          return res.send({ message: 'your order is empty', error: err })
        }
      }).catch(err => {
        res.send({ message: 'something wrong to find your order', err: err })
      })
    }
    else {
      return res.send({ message: 'sorry  you are not a user' })
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })
}

//order delete api

module.exports.DeleteOrder = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      if (req.body.orderId == '' || req.body.orderId == undefined) {
        return res.send({ message: 'order id is must to delete your order colletion' })
      }
      else {
        Order.find({ user: decoded._id, _id: req.body.orderId }, async (err, add1) => {
          if (add1) {
            Order.deleteOne({ user: decoded._id, _id: req.body.orderId }).then(data => {
              if (data.deletedCount) {
                Order.find({ user: decoded._id }, async (err, add) => {
                  if (add) {
                    await User.updateOne({ _id: decoded._id }, { $set: { order: add } }).then(datas => {
                      if (datas) {
                        return res.status(200).send({ message: 'order deleted successfully', data: add1 })
                      }
                      else {
                        return res.send({ message: 'sorry I cannot update your in user collection' })
                      }
                    }).catch(err => {
                      return res.send({ message: 'samething wrong to find your account', error: err });
                    })
                  }
                  else {
                    return res.send({ message: 'sorry data cannot added in your address collection', error: err });
                  }
                })
              }
              else {
                return res.send({ message: 'sorry data cannot delete', error: err });
              }
            })
              .catch(err => {
                return res.send({ message: 'samething wrong to find your address', error: err });
              })
          }
          else {
            return res.send({ message: 'sorry data cannot added in your address collection', error: err });
          }
        })
          .catch(err => {
            return res.send({ message: 'samething wrong to find your address', error: err });
          })
      }
    }
    else {
      return res.send({ message: 'sorry you are not a user' })
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })
}

/*update the Order data*/

module.exports.putOrder = async (req, res) => {
  let ts = Date.now();
  var order
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth();
  let year = date_ob.getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var ddate = (date + " " + monthNames[month] + " " + year)
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data) {
      if (data.usertype == "user") {
        if (req.body.orderId == '' || req.body.orderId == undefined) {
          return res.send({ message: 'quanity is must to update your', error: err });
        }
        else {
          if ((req.body.status != 'Ordered') && (req.body.status != 'Delivered') && (req.body.status != 'Cancelled')) {
            return res.send({ message: 'status is must be like this Ordered,Delivered' })
          }
          else {
            if (req.body.status == 'Cancelled') {
              order = {
                status: req.body.status,
                deliveredDate: ddate
              }
            }
            else {
              return res.send({ message: 'you are only update status cancelled' })
            }
            Order.updateOne({ _id: req.body.orderId, user: decoded._id }, { $set: order })
              .then(data => {
                if (data.nModified) {
                  Order.find({ _id: req.body.orderId, user: decoded._id }, async (err, data) => {
                    if (!err) {
                      await User.updateOne({ _id: decoded.orderId }, { $set: { bag: data } })
                      Order.find({ user: decoded._id })
                        .populate('product')
                        .then(data => {
                          return res.status(200).send({ status: true, message: 'updated successfully', data: data });
                        })
                        .catch(err => {
                          return res.send({ message: 'samething wrong to find your bag', error: err });
                        })
                    }
                  })
                }
                else {
                  return res.send({ message: 'sorry connot update', data: data })
                }
              })
              .catch(err => {
                return res.send({ message: 'samething wrong to find your bag', error: err });
              })
          }
        }
      }
      else {
        return res.send({ message: ' your are not user', error: err });
      }
    }
    else {
      return res.send({ message: 'cannot find your account', error: err });
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })


}

/*delivary boy update the Order data*/

module.exports.putOrderDelivery = async (req, res) => {
  let ts = Date.now();
  var order
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth();
  let year = date_ob.getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var ddate = (date + " " + monthNames[month] + " " + year)
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data) {
      if (data.usertype == "Delivary") {
        if (req.body.orderId == '' || req.body.orderId == undefined) {
          return res.send({ message: 'quanity is must to update your', error: err });
        }
        else {
          if ((req.body.status != 'Ordered') && (req.body.status != 'Delivered') && (req.body.status != 'Cancelled')) {
            return res.send({ message: 'status is must be like this Ordered,Delivered' })
          }
          else {
            if (req.body.status == 'Delivered') {
              order = {
                status: req.body.status,
                deliveredDate: ddate
              }
            }
            else {
              return res.send({ message: 'you only update status delivered only', error: err });
            }
            Order.updateOne({ _id: req.body.orderId, user: decoded._id }, { $set: order })
              .then(data => {
                if (data.nModified) {
                  Order.find({ _id: req.body.orderId, user: decoded._id }, async (err, data) => {
                    if (!err) {
                      await User.updateOne({ _id: decoded.orderId }, { $set: { bag: data } })
                      Order.find({ user: decoded._id })
                        .populate('product')
                        .then(data => {
                          return res.status(200).send({ status: true, message: 'updated successfully', data: data });
                        })
                        .catch(err => {
                          return res.send({ message: 'samething wrong to find your bag', error: err });
                        })
                    }
                  })
                }
                else {
                  return res.send({ message: 'sorry connot update', data: data })
                }
              })
              .catch(err => {
                return res.send({ message: 'samething wrong to find your bag', error: err });
              })
          }
        }
      }
      else {
        return res.send({ message: 'your are not delivery boy', error: err });
      }
    }
    else {
      return res.send({ message: 'cannot find your account', error: err });
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })


}


//get by Id 

module.exports.getByProduct = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  console.log(req.body.token)
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      Order.find({ user: decoded._id, _id: req.params._id }).populate('orders.product').populate('address').then(data => {
        // Product.find({_id:req.params.product}).then(product=>{
        if (data) {
          return res.status(200).send({ message: 'this is your order', order: data })
        }
        else {
          return res.send({ message: 'your order is empty', error: err })
        }
        // }).catch(err => {
        //   res.send({ message: 'something wrong to find your product ', err: err })
        // })
      }).catch(err => {
        res.send({ message: 'something wrong to find your ', err: err })
      })
    }
    else {
      return res.send({ message: 'sorry  you are not a user' })
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })
}


//create wishlist

module.exports.CreateWishlist = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  console.log(req.body.token)
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      if (req.body.product == '' || req.body.product == undefined) {
        return res.send({ message: 'product id is must to  your wishlist', error: err });
      }
      else {
        Wishlist.findOne({
          product: req.body.product, user: decoded._id
        }).then(data => {
          if (data) {
            return res.send({ message: 'This product already added in your wishlist Collections' });
          } else {
            var wishlist = new Wishlist({
              product: req.body.product,
              user: decoded._id
            })
            wishlist.save().then(create => {
              if (create) {
                Wishlist.find({ user: decoded._id }, async (err, wish) => {
                  if (wish) {
                    await User.updateOne({ _id: decoded._id }, { $set: { wish: wish } }).then(data => {
                      if (data) {
                        return res.send({ message: 'wishlist created successfully', data: create })
                      }
                    }).catch(err => {
                      return res.send({ message: 'samething wrong to update your wishlist', error: err });
                    })
                  }
                  else {
                    return res.send({ message: 'sorry data cannot added in your address collection', error: err });
                  }
                }).catch(err => {
                  return res.send({ message: 'samething wrong to find your wishlist', error: err });
                })
              }
              else {
                return res.send({ message: 'sorry connot add this product to your wishlist' });
              }
            })
          }
        })
          .catch(err => {
            return res.send({ message: 'samething wrong to find your product', error: err });
          })
      }
    }
    else {
      return res.send({ message: ' your are not user', error: err });
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })


}

//move bag to wishlist
//create wishlist

module.exports.BagCreateWishlist = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  console.log(req.body.token)
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      if (req.body.product == '' || req.body.product == undefined) {
        return res.send({ message: 'product id is must to  your wishlist', error: err });
      }
      else {
        if (req.body._id == '' || req.body._id == undefined) {
          return res.send({ message: 'product id is must to  your wishlist', error: err });
        }
        else {
          Wishlist.findOne({
            product: req.body.product, user: decoded._id
          }).then(data => {
            if (data) {
              return res.send({ message: 'This product already added in your wishlist Collections' });
            } else {
              var wishlist = new Wishlist({
                product: req.body.product,
                user: decoded._id
              })
              wishlist.save().then(create => {
                if (create) {
                  Wishlist.find({ user: decoded._id }, async (err, wish) => {
                    if (wish) {
                      await User.updateOne({ _id: decoded._id }, { $set: { wish: wish } }).then(data => {
                        if (data) {
                          Bag.findOne({ _id: req.body._id, product: req.body.product, user: decoded._id }, (err, data) => {
                            if (data) {
                              Bag.deleteOne({ _id: req.body._id, product: req.body.product, user: decoded._id })
                                .then(data => {
                                  Bag.find({ user: decoded._id }, async (err, data) => {
                                    if (!err) {
                                      await User.updateOne({ _id: decoded._id }, { $set: { bag: data } })
                                      return res.send({ message: 'wishlist created successfully', data: create })
                                    }
                                    else {
                                      return res.send({ message: 'samthing wrong to find your product', error: err })
                                    }
                                  })
                                })
                            }
                            else {
                              return res.send({ message: 'cannot find your account', error: err });
                            }
                          })
                            .catch(err => {
                              return res.send({ message: 'samething wrong to find your bag', error: err });
                            })
                        }
                      }).catch(err => {
                        return res.send({ message: 'samething wrong to update your wishlist', error: err });
                      })
                    }
                    else {
                      return res.send({ message: 'sorry data cannot added in your address collection', error: err });
                    }
                  }).catch(err => {
                    return res.send({ message: 'samething wrong to find your wishlist', error: err });
                  })
                }
                else {
                  return res.send({ message: 'sorry connot add this product to your wishlist' });
                }
              })
            }
          })
            .catch(err => {
              return res.send({ message: 'samething wrong to find your product', error: err });
            })
        }
      }
    }
    else {
      return res.send({ message: ' your are not user', error: err });
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })


}
//get wishlist

module.exports.getAllwishlist = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  console.log(req.body.token)
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      Wishlist.find({ user: decoded._id }).populate('product').then(wish => {
        if (wish) {
          return res.send({ message: 'this is your wislist', data: wish })
        }
        else {
          return res.send({ message: 'sorry i cannot get your wislist', err: err })
        }
      }).catch(err => {
        return res.send({ message: 'samething wrong to update your wishlist', error: err });
      })
    }
    else {
      return res.send({ message: ' your are not user', error: err });
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })
}

//wishlist delete api

module.exports.DeleteWishlist = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      if (req.body.wishId == '' || req.body.wishId == undefined) {
        return res.send({ message: 'wish id is must to delete your wish colletion' })
      }
      else {

        Wishlist.find({ user: decoded._id, _id: req.body.wishId }, async (err, add1) => {
          if (add1) {
            Wishlist.deleteOne({ user: decoded._id, _id: req.body.wishId }).then(data => {
              if (data.deletedCount) {
                Wishlist.find({ user: decoded._id }, async (err, add) => {
                  if (add) {
                    await User.updateOne({ _id: decoded._id }, { $set: { wish: add } }).then(datas => {
                      if (datas) {
                        return res.status(200).send({ message: 'wishlist deleted successfully', data: add1 })
                      }
                      else {
                        return res.send({ message: 'sorry I cannot update your in user collection' })
                      }
                    }).catch(err => {
                      return res.send({ message: 'samething wrong to find your account', error: err });
                    })
                  }
                  else {
                    return res.send({ message: 'sorry data cannot added in your address collection', error: err });
                  }
                })
              }
              else {
                return res.send({ message: 'sorry data cannot delete', error: err });
              }
            })
              .catch(err => {
                return res.send({ message: 'samething wrong to find your address', error: err });
              })
          }
          else {
            return res.send({ message: 'sorry data cannot added in your address collection', error: err });
          }
        })
          .catch(err => {
            return res.send({ message: 'samething wrong to find your address', error: err });
          })

      }
    }
    else {
      return res.send({ message: 'sorry you are not a user' })
    }
  }).catch(err => {
    return res.send({ message: 'samething wrong to find your account', error: err });
  })
}


/*product add to bag*/

module.exports.moveToBag = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
  User.findOne({
    _id: decoded._id,
  }).then(data => {
    if (data.usertype == "user") {
      if (req.body.productSize == '' || req.body.productSize == 'undefine') {
        res.send('Product size was most to add your product into bag')
      }
      else {
        if (req.body.product == '' || req.body.product == 'undefine') {
          res.send('Product id was most to add your product into bag')
        }
        else {
          if (req.body.wishId == '' || req.body.wishId == 'undefine') {
            res.send('Product id was most to add your product into bag')
          }
          else {
            Product.findOne({ _id: req.body.product }).then(pro => {
              if (pro) {
                Bag.findOne({ product: req.body.product, user: decoded._id }).then(bagdata => {
                  if (!bagdata) {
                    const bags = new Bag({
                      productSize: req.body.productSize,
                      product: pro,
                      user: data,
                      quantity: req.body.quantity
                    })
                    bags.save({}, (err, bag) => {
                      if (err) {
                        return res.send({ message: 'samthing wrong to find your product', error: err })
                      }
                      else {
                        Bag.find({ user: decoded._id }, async (err, data) => {
                          if (!err) {
                            await User.updateOne({ _id: decoded._id }, { $set: { bag: data } })
                            Wishlist.find({ user: decoded._id, _id: req.body.wishId }, async (err, add1) => {
                              if (add1) {
                                Wishlist.deleteOne({ user: decoded._id, _id: req.body.wishId }).then(data => {
                                  if (data.deletedCount) {
                                    Wishlist.find({ user: decoded._id }, async (err, add) => {
                                      if (add) {
                                        await User.updateOne({ _id: decoded._id }, { $set: { wish: add } }).then(datas => {
                                          if (datas) {
                                            return res.status(200).send({ message: 'product added in your bag successfully', bag: bag })
                                          }
                                          else {
                                            return res.send({ message: 'sorry I cannot update your in user collection' })
                                          }
                                        }).catch(err => {
                                          return res.send({ message: 'samething wrong to find your account', error: err });
                                        })
                                      }
                                      else {
                                        return res.send({ message: 'sorry data cannot added in your address collection', error: err });
                                      }
                                    })
                                  }
                                  else {
                                    return res.send({ message: 'sorry data cannot delete', error: err });
                                  }
                                })
                                  .catch(err => {
                                    return res.send({ message: 'samething wrong to find your address', error: err });
                                  })
                              }
                              else {
                                return res.send({ message: 'sorry data cannot added in your address collection', error: err });
                              }
                            })
                              .catch(err => {
                                return res.send({ message: 'samething wrong to find your address', error: err });
                              })

                          }
                          else {
                            return res.send({ message: 'samthing wrong to find your product', error: err })
                          }
                        })

                      }
                    })
                  }
                  else {
                    Bag.find({ product: req.body.product, user: decoded._id }, async (err, data) => {
                      if (!err) {
                        return res.status(200).send({ message: 'product already added in your bag successfully', bag: data })
                      }
                      else {
                        return res.send({ message: 'samthing wrong to find your product', error: err })
                      }
                    })
                  }
                }).catch(err => {
                  return res.send({ message: 'samthing wrong to find your bag', error: err })
                })
              }
              else {
                return res.send({ message: 'Product is not there check your product id' })
              }
            }).catch(err => {
              return res.send({ message: 'samthing wrong to find your product', error: err })
            })
          }
        }
      }
    }
    else {
      return res.send({ message: "sorry  you are not a user" })
    }
  }).catch(err => {
    return res.send({ message: 'cannot find your account', error: err });
  })
}
