
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('La variable MONGODB_URI no está configurada');
    }

    await mongoose.connect(mongoURI);

    console.log('Conexión a MongoDB establecida correctamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

