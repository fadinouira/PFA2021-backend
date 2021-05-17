const express = require('express');

const Item = require('../models/item');
const checkAuth = require('../middlewares/check');
const router = express.Router();

//create an Item
router.post("",checkAuth,(req,res,next)=> {
    const item = new Item({
      owner : req.userData.id,
      ownerPhoto :req.body.ownerPhoto,
      ownerName : req.body.ownerName,
      name : req.body.name,
      status : 0,
      weight  : req.body.weight,
    }) ;
    console.log(item);
    item.save().then(result => {
      res.status(201).json({
        message : "item added succesfully",
        item : {
            id : result._id,
            owner : result.owner,
            name : result.name,
            status : result.status,
            weight  : result.weight,
        }
      });
    });
  
});

//find one Item
router.get('/:id',(req,res,next)=> {
    Item.findOne({_id : req.params.id}).then((result) => {
        console.log(result);
        if(result){
            res.status(200).json({ 
                message:  'item received',
                item : result
            });
        }
        else {
        res.status(404).json({ message: "Item does not exist !" });
        }
    });
});

//find all user Items
router.get('',checkAuth,(req,res,next)=> {
    Item.find({owner : req.userData.id}).then((result) => {
        console.log(result);
        if(result){
            res.status(200).json({ 
                message:  'item received',
                items : result
            });
        }
        else {
        res.status(404).json({ message: "Item does not exist !" });
        }
    });
});



//delete item 
router.delete('/:id',checkAuth,(req,res,next) => {
    Item.deleteOne({_id : req.params.id,owner : req.userData.id}).then((result)=>{
      console.log(result);
      if(result.deletedCount > 0){
        res.status(200).json({ message:  'Item deleted !'});
      }
      else {
        res.status(401).json({ message: "only the owner can delete this !" });
      }
    });
  });


//delivred
function itemDelivred(id) {
    const item = {
        _id: id,
        status : 4, 
      } ;
    var res ;
    setTimeout(()=>{
        Item.updateOne({ _id: id },item).then(result => {
          if(result.nModified > 0){
            res = true ;
          }
          else {
            res = false ;
          }
        });
    },5000);
    return res ;
}   



module.exports = router ;