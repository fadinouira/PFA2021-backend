const express = require('express');
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

router.post("/signup",(req,res,next)=> {
  bcrypt.hash(req.body.password,10)
  .then(hash => {
    const user = new User({
        email : req.body.email,
        password : hash,
        name : req.body.name,
        city : req.body.city,
        location :req.body.location,
        phone : req.body.phone,
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message : "user added successfully !",
        result : result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error : err
      });
    });
  });
});

router.post('/login',(req,res,next) => {
  var connectedUser =  new User() ;
  User.findOne({email : req.body.email})
    .then(user => {
      if(!user) {
        console.log("wrong email");
        return res.status(401).json({
          message: "Email do not exist"
        });
      }
      else {
        connectedUser.name = user.name ;
        connectedUser.email = user.email ;
        return bcrypt.compare(req.body.password,user.password);
      }
    })
    .then(result => {
      if(!result){
        console.log("wrong pass");
        return res.status(401).json({
          message : "wrong password !"
        });
      }
      const token = jwt.sign(
        {
        email : connectedUser.email,
        id : connectedUser._id
        },
        "fedi%%aazizasqlkdjlsqkd5556@thisisèé-_&çéçé%%%" ,
        {
          expiresIn : "168h"
        }
      );
      res.status(200).json({
        message : "connected",
        connectedUser,
        token,
        expiresIn : 604800
      })

    })
    .catch(err => {
      console.log("auth failed: "+ err);
      return res.status(401).json({
        message : "auth failed !"
      });
    })
});


module.exports = router ;
