const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  type: String,
  breed: String,
  ownerID: String
});


module.exports = mongoose.model('Pet', petSchema);