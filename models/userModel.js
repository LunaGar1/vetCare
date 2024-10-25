const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  names: String,
  lastNames: String,
  typeID: String,
  ID: String,
  Role: String,
  user: String,
  password: String

});

module.exports = mongoose.model('User', userSchema);