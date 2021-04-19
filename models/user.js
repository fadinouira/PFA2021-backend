const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email : {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'email is invalid'], index: true},
  password : {type:String , required : true},
  name : {type: String , required : true },
  city : {type: String , required : true },
  location :{type: String , required : false },
  phone : {type: Number, required : true, unique:true},
  type : {type: String, required : true}
});

userSchema.plugin(unique , {message: 'is already taken.'});

module.exports = mongoose.model('User',userSchema);


