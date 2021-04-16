const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const itemSchema = mongoose.Schema({
  email : {type: String, required : true, unique:true},
});

itemSchema.plugin(unique);

module.exports = mongoose.model('Item',itemSchema);

