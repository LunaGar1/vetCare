const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    stock: { type: Number, required: true }
});

module.exports = mongoose.model('Medicine', medicineSchema)