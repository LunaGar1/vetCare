const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/vetcare', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conection to MongoDB established');
  } catch (error) {
    console.error('Error conecting MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;