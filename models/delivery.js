const mongoose = require('mongoose');
const Item = require('./item');
const deliverySchema = mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId , ref:"User",required:true},
    ownerName : {type: String,required:true},
    ownerPhoto : {type: String,required:true},
    ownerPhone : {type: Number,required:true},
    ownerEmail : {type: String,required:true},
    originAddress : {type: String, required : true},
    deliveryAddress : {type: String, required : true},
    expectedArrivalDate : {type: Date, required : true},
    departDate : {type: Date, required : true},
    onRoad : {type: Boolean ,required : true},
    onDestination : {type: Boolean ,required : true},
    acceptedItems : {type : [mongoose.Schema.Types.ObjectId],ref:"Item"},
    listedItems : {type : [mongoose.Schema.Types.ObjectId],ref:"Item"}
});


module.exports = mongoose.model('Delivery',deliverySchema);

