const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  date: Date,
  sex: String,
  type: String,
  breed: String,
  // ownerID: String
});


module.exports = mongoose.model('Pet', petSchema);