const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  owner : {type: mongoose.Schema.Types.ObjectId , ref:"User",required:true},
  ownerPhoto : {type: String, required : true},
  ownerName : {type: String, required : true},
  name : {type: String, required : true},
  status : {type: Number, required : true},//client=0,shipping=1,onRoad=2,onDestination=3,delivred=4
  weight : {type: Number, required : true}
});


module.exports = mongoose.model('Item',itemSchema);

