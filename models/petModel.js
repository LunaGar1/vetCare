const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  typeID: String,
  date: Date,
  age: int,
  sex: int,
  password: String

});


module.exports = mongoose.model('User', userSchema);