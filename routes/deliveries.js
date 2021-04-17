const express = require('express');

const Delivery = require('../models/delivery');
const checkAuth = require('../middlewares/check');
const router = express.Router();

//create a delivery
router.post("",checkAuth,(req,res,next)=> {
  const delivery = new Delivery({
    owner : req.body.id,
    originAddress : req.body.originAddress,
    deliveryAddress :req.body.deliveryAddress,
    expectedArrivalDate : req.body.expectedArrivalDate,
    itemsShipped : false,
    itemsDelivered : false,
  }) ;
  console.log(delivery);
  delivery.save().then(result => {
    res.status(201).json({
      message : "delivery added succesfully",
      delivery : {
        id : result._id,
        owner : result.owner,
        originAddress : result.originAddress,
        deliveryAddress :result.deliveryAddress,
        expectedArrivalDate : result.expectedArrivalDate,
        itemsShipped : result.itemsShipped,
        itemsDelivered : result.itemsDelivered,
      }
    });
  });

})

//update a delivery
router.put("/:id",checkAuth, (req, res, next) => {
  delivery = new Delivery({
    _id: req.params.id,
    originAddress : req.body.originAddress,
    deliveryAddress :req.body.deliveryAddress,
    expectedArrivalDate : req.body.expectedArrivalDate,
    itemsShipped : req.body.itemShipped,
    itemsDelivered : req.body.itemDelivered,
    acceptedItems : req.body.acceptedItems,
    listedItems : req.body.listedItems
  });
  Delivery.updateOne({ _id: req.params.id , owner : req.userData.id}, delivery).then(result => {
    if(result.nModified > 0){
      res.status(200).json({ message: "Update successful!" });
    }
    else {
      res.status(401).json({ message: "only the owner can modify this !" });
    }
  });
});


//get all deliveries
router.get('',(req,res,next)=> {
  console.log(req.query);
  const pageSize = +req.query.pageSize ;
  const currentPage = +req.query.currentPage ;
  const deliveryQuery = Delivery.find() ;
  let fetchedDeliveries;
  if(pageSize && currentPage) {
    deliveryQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  deliveryQuery
    .then(documents => {
      fetchedDeliveries = documents ;
      return Delivery.countDocuments();
    })
      .then(count => {
        res.status(200).json({
          message : "result from server:",
          deliveries: fetchedDeliveries,
          maxPages : count
        });
      })
    .catch();
});


//get one delivery
router.get('/:id',(req,res,next)=> {
  Delivery.findOne({_id : req.params.id}).then((result) => {
    console.log(result);
    if(result){
      res.status(200).json({ 
        message:  'delivery received',
        delivery : result
      });
    }
    else {
      res.status(404).json({ message: "Delivery does not exist !" });
    }
  });

});


//delete one delivery
router.delete('/:id',checkAuth,(req,res,next) => {
  Delivery.deleteOne({_id : req.params.id,owner : req.userData.id}).then((result)=>{
    console.log(result);
    if(result.deletedCount > 0){
      res.status(200).json({ message:  'Delivery deleted !'});
    }
    else {
      res.status(401).json({ message: "only the owner can delete this !" });
    }
  });

});


//when a user add an item to be transported
router.put("/addItem/:id",checkAuth, (req, res, next) => {
  delivery = {
    _id: req.params.id,
    $push : {listedItems : req.body.item} ,
  };
  console.log(delivery);
  Delivery.updateOne({ _id: req.params.id }, delivery).then(result => {
    if(result.nModified > 0){
      res.status(200).json({ message: "Item added successfully" });
    }
    else {
      res.status(401).json({ message: "Failed !" });
    }
  });
});


//when the deelivery owner accept an item to be transported
router.put("/acceptItem/:id",checkAuth, (req, res, next) => {
  delivery = {
    _id: req.params.id,
    $push : {acceptedItems : req.body.item} ,
  };
  console.log(delivery);
  Delivery.updateOne({ _id: req.params.id,owner : req.userData.id }, delivery).then(result => {
    if(result.nModified > 0){
      res.status(200).json({ message: "Item accepted" });
    }
    else {
      res.status(401).json({ message: "Failed !" });
    }
  });
});


// when when the deelivery owner start his trip
router.get("/onRoad/:id",checkAuth, (req, res, next) => {
  delivery = {
    _id: req.params.id,
    itemsShipped:true
  };
  console.log(delivery);
  Delivery.updateOne({ _id: req.params.id,owner : req.userData.id }, delivery).then(result => {
    if(result.nModified > 0){
      res.status(200).json({ message: "Items shipped" });
    }
    else {
      res.status(401).json({ message: "Failed !" });
    }
  });
});


// when the deelivery owner get to his destination
router.get("/delivered/:id",checkAuth, (req, res, next) => {
  delivery = {
    _id: req.params.id,
    itemsDelivered:true
  };
  console.log(delivery);
  Delivery.updateOne({ _id: req.params.id,owner : req.userData.id }, delivery).then(result => {
    if(result.nModified > 0){
      res.status(200).json({ message: "Item delivered" });
    }
    else {
      res.status(401).json({ message: "Failed !" });
    }
  });
});

module.exports = router ;
