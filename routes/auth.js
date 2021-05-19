const express = require('express');
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const multer = require('multer');


const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpeg',
  'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    console.log(file);
    const isValid = MIME_TYPE_MAP[file.mimetype] ;
    var error = new Error("invalid type");
    if(isValid) {
      error = null ;
    }
    cb(error,"./images");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const text = MIME_TYPE_MAP[file.mimetype];
    cb(null,name + '-' + Date.now() + '.' + text);
  }
});

router.post("/signup",multer({storage : storage}).single("image"),(req,res,next)=> {
  const url = req.protocol + '://' + req.get("host") ;
  console.log(req.body);
  bcrypt.hash(req.body.password,10)
  .then(hash => {
    const user = new User({
        email : req.body.email,
        password : hash,
        name : req.body.name,
        city : req.body.city,
        location :req.body.location,
        phone : req.body.phone,
        type : req.body.type,
        image: url + "/images/" + req.file.filename,
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
        connectedUser = {
          id : user.id,
          name : user.name ,
          email : user.email ,
          image : user.image ,
          phone : user.phone ,
          city : user.city,
          type : user.type
        }
        console.log(connectedUser);
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
        id : connectedUser.id
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

router.get('/:id',(req,res,next)=> {
  User.findOne({_id : req.params.id}).then((result) => {
    console.log(result);
    if(result){
      res.status(200).json({ 
        message:  'user',
        user : {
          name : result.name ,
          phone : result.phone ,
          email : result.email  ,
          type : result.type
        }
      });
    }
    else {
      res.status(404).json({ message: "Delivery does not exist !" });
    }
  });

});




module.exports = router ;
