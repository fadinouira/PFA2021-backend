const mongoose = require('mongoose');
const Item = require('./item');
const deliverySchema = mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId , ref:"User",required:true},
    originAddress : {type: String, required : true},
    deliveryAddress : {type: String, required : true},
    expectedArrivalDate : {type: Date, required : true},
    itemsShipped : {type: Boolean ,required : true},
    itemsDelivered : {type: Boolean ,required : true},
    acceptedItems : {type : [mongoose.Schema.Types.ObjectId],ref:"Item",required : true},
    listedItems : {type : [mongoose.Schema.Types.ObjectId],ref:"Item",required : true}
});


module.exports = mongoose.model('Delivery',deliverySchema);

