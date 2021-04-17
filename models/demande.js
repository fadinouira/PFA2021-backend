const mongoose = require('mongoose');

const demandeSchema = mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId , ref:"User",required:true},
    name : {type: String, required : true},
    taken : {type: Boolean, required : true},
});


module.exports = mongoose.model('Demande',demandeSchema);

