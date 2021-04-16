const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const Item = require('./item');
const deliverySchema = mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId , ref:"User",required:true},
    originAddress : {type: String, required : true},
    deliveryAddress : {type: String, required : true},
    expectedArrivalDate : {type: Date, required : true},
    itemShipped : {type: Boolean},
    itemDelivered : {type: Boolean},
    provider : {type: mongoose.Schema.Types.ObjectId},
    items : [[mongoose.Schema.Types.ObjectId]]
});


module.exports = mongoose.model('Delivery',deliverySchema);

