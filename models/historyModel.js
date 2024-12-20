const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  petID: String,
  vetID: String,
  date: Date,
  description: String,
  ownerID: String
});




module.exports = mongoose.model('History', historySchema);