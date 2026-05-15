const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },   
  email:     { type: String, unique: true, required: true }, 
  password:  { type: String, minlength: 6, required: true },  
  role:    { type: String, default: 'customer', enum: ['customer', 'admin'] },   
 
});

module.exports = mongoose.model("User", userSchema);