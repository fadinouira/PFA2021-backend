const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  
});

userSchema.plugin(unique);

module.exports = mongoose.model('User',userSchema);

