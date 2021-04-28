const mongoose = require('mongoose');
const Item = require('./item');
const deliverySchema = mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId , ref:"User",required:true},
    ownerName : {type: String,required:true},
    ownerPhoto : {type: String},
    ownerPhone : {type: Number},
    ownerEmail : {type: String},
    originAddress : {type: String, required : true},
    deliveryAddress : {type: String, required : true},
    expectedArrivalDate : {type: Date, required : true},
    onRoad : {type: Boolean ,required : true},
    onDestination : {type: Boolean ,required : true},
    acceptedItems : {type : [mongoose.Schema.Types.ObjectId],ref:"Item"},
    listedItems : {type : [mongoose.Schema.Types.ObjectId],ref:"Item"}
});


module.exports = mongoose.model('Delivery',deliverySchema);

