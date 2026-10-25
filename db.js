
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI ||
      'mongodb://localhost:27017/vetcare';

    await mongoose.connect(mongoURI);

    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
