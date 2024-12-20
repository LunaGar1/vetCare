const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  vetName: String,
  vetID : String,
  petName: String,
  datetime: Date,
  ownerID: String
});


module.exports = mongoose.model('App', appSchema);