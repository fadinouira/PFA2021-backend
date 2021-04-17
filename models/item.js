const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  owner : {type: mongoose.Schema.Types.ObjectId , ref:"User",required:true},
  name : {type: String, required : true},
  status : {type: String, required : true},//client,onRoad,onDestination,delivred
  provider : {type: mongoose.Schema.Types.ObjectId , ref:"User"}
});


module.exports = mongoose.model('Item',itemSchema);

