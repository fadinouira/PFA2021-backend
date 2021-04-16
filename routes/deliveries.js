const express = require('express');

const Delivery = require('../models/delivery');
const checkAuth = require('../middlewares/check');
const router = express.Router();


router.post("",checkAuth,(req,res,next)=> {
  const delivery = new Delivery({
    owner : req.body.id,
    originAddress : req.body.originAddress,
    deliveryAddress :req.body.deliveryAddress,
    expectedArrivalDate : req.body.expectedArrivalDate,
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
      }
    });
  });

})



// router.put("/:id",checkAuth,multer({storage : storage}).single("image"), (req, res, next) => {
//   const url = req.protocol + '://' + req.get("host") ;
//   let delivery ;
//   if(req.body.imagePath != ""){

//     delivery = new Delivery({
//       _id: req.params.id,
//       title: req.body.title,
//       content: req.body.content,
//       imagePath : req.body.imagePath
//     });
//   }
//   else {
//     delivery = new Delivery({
//       _id: req.params.id,
//       title: req.body.title,
//       content: req.body.content,
//       imagePath : url + "/images/" + req.file.filename
//     });
//   }
//   Delivery.updateOne({ _id: req.params.id ,creator : req.userData.id}, delivery).then(result => {
//     if(result.nModified > 0){
//       res.status(200).json({ message: "Update successful!" });
//     }
//     else {
//       res.status(401).json({ message: "only the owner can modify this !" });
//     }

//   });
// });

// router.get('',(req,res,next)=> {
//   console.log(req.query);
//   const pageSize = +req.query.pageSize ;
//   const currentPage = +req.query.currentPage ;
//   const deliveryQuery = Delivery.find() ;
//   let fetcheddeliverys;
//   if(pageSize && currentPage) {
//     deliveryQuery
//       .skip(pageSize * (currentPage - 1))
//       .limit(pageSize);
//   }

//   deliveryQuery
//     .then(documents => {
//       fetcheddeliverys = documents ;
//       return Delivery.countDocuments();
//     })
//       .then(count => {
//         res.status(200).json({
//           message : "result from server:",
//           deliverys: fetcheddeliverys,
//           maxPages : count
//         });
//       })
//     .catch();
// });



// router.delete('/:id',checkAuth,(req,res,next) => {
//   Delivery.deleteOne({_id : req.params.id,creator : req.userData.id}).then((result)=>{
//     console.log(result);
//     if(result.deletedCount > 0){
//       res.status(200).json({ message:  'Delivery deleted !'});
//     }
//     else {
//       res.status(401).json({ message: "only the owner can delete this !" });
//     }
//   });

// });

module.exports = router ;
