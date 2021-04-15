const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email : {type: String, required : true, unique:true},
  password : {type:String , required : true},
  name : {type: String , required : true },
  city : {type: String , required : true },
  location :{type: String , required : false },
  phone : {type: String, required : true, unique:true},
});

userSchema.plugin(unique);

module.exports = mongoose.model('User',userSchema);


