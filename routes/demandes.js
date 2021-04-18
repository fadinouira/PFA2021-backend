const express = require('express');

const Demande = require('../models/demande');
const checkAuth = require('../middlewares/check');
const router = express.Router();

//create a demande
router.post("",checkAuth,(req,res,next)=> {
  const demande = new Demande({
    owner : req.body.id,
    originAddress : req.body.originAddress,
    deliveryAddress :req.body.deliveryAddress,
    wantedArrivalDate : req.body.wantedArrivalDate,
    itemShipped : false,
    itemDelivered : false,
    item : req.body.item,
  }) ;
  console.log(demande);
  demande.save().then(result => {
    res.status(201).json({
      message : "demande added succesfully",
      demande : {
        id : result._id,
        owner : result.owner,
        originAddress : result.originAddress,
        deliveryAddress :result.deliveryAddress,
        wantedArrivalDate : result.wantedArrivalDate,
        itemShipped : result.itemsShipped,
        itemDelivered : result.itemsDelivered,
      }
    });
  });

})



module.exports = router ;
