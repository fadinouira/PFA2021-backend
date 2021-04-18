const mongoose = require('mongoose');

const demandeSchema = mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId , ref:"User",required:true},
    originAddress : {type: String, required : true},
    deliveryAddress : {type: String, required : true},
    wantedArrivalDate : {type: Date, required : true},
    itemShipped : {type: Boolean ,required : true},
    itemDelivered : {type: Boolean ,required : true},
    item : {type : mongoose.Schema.Types.ObjectId,ref:"Item"},
    provider: {type: mongoose.Schema.Types.ObjectId , ref:"User"},
    listedProviders : {type: [mongoose.Schema.Types.ObjectId] , ref:"User"}
});


module.exports = mongoose.model('Demande',demandeSchema);

