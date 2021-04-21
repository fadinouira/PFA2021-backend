const express = require('express');

const Demande = require('../models/demande');
const Item = require('../models/item');
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

//update a demande
router.put("/:id",checkAuth, (req, res, next) => {
  const demande = new Demande({
    _id: req.params.id,
    originAddress : req.body.originAddress,
    deliveryAddress :req.body.deliveryAddress,
    wantedArrivalDate : req.body.wantedArrivalDate,
    itemShipped : req.body.itemShipped,
    itemDelivered : req.body.itemDelivered,
  }) ;
  Demande.updateOne({ _id: req.params.id , owner : req.userData.id}, demande).then(result => {
    if(result.nModified > 0){
      res.status(200).json({ message: "Update successful!" });
    }
    else {
      res.status(401).json({ message: "only the owner can modify this !" });
    }
  });
});

//get all demandes
router.get('',(req,res,next)=> {
  console.log(req.query);
  const pageSize = +req.query.pageSize ;
  const currentPage = +req.query.currentPage ;
  const demandeQuery = Demande.find() ;
  let fetchedDemandes;
  if(pageSize && currentPage) {
    demandeQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  demandeQuery
    .then(documents => {
      fetchedDemandes = documents ;
      return Demande.countDocuments();
    })
      .then(count => {
        res.status(200).json({
          message : "result from server:",
          demandes: fetchedDemandes,
          maxPages : count
        });
      })
    .catch();
});

//get one demande
router.get('/:id',(req,res,next)=> {
  Demande.findOne({_id : req.params.id}).then((result) => {
    console.log(result);
    if(result){
      res.status(200).json({ 
        message:  'delivery received',
        demande : result
      });
    }
    else {
      res.status(404).json({ message: "Demande does not exist !" });
    }
  });

});

//delete one demande
router.delete('/:id',checkAuth,(req,res,next) => {
  Demande.deleteOne({_id : req.params.id,owner : req.userData.id}).then((result)=>{
    console.log(result);
    if(result.deletedCount > 0){
      res.status(200).json({ message:  'Demande deleted !'});
    }
    else {
      res.status(401).json({ message: "only the owner can delete this !" });
    }
  });
});

//when transporter request to take this demande
router.put("/takeJob/:id",checkAuth, (req, res, next) => {
  demande = {
    _id: req.params.id,
    $push : {listedProviders : req.body.provider} ,
  };
  console.log(demande);
  Demande.updateOne({ _id: req.params.id }, demande).then(result => {
    if(result.nModified > 0){
      res.status(200).json({ message: "provider listed successfully" });
    }
    else {
      res.status(401).json({ message: "Failed !" });
    }
  });
});

//when the owner accept the transporter request 
router.put("/acceptJob/:id",checkAuth, (req, res, next) => {
  demande = {
    _id: req.params.id,
    provider : req.body.provider,
  };
    const item = {
      _id: req.body.item,
      status : 1, 
    } 
    Item.updateOne({ _id: req.body.item },item).then(result => {
      if(result.nModified > 0){
        Demande.updateOne({ _id: req.params.id/*,owner : req.userData.id*/ }, demande).then(result => {
          console.log("we are here");
          if((result.nModified > 0)){
            res.status(200).json({ message: "provider accepted successfully" });
          }
          else {
            res.status(401).json({ message: "Failed !" });
          }
          console.log(a);
        });
      }
      else {
        res.status(401).json({ message: "Failed !" });
      }
    });  
});

module.exports = router ;
