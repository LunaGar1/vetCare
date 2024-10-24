const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const User = require('./models/userModel');
const cors = require('cors');

const app = express();

// Conectar a la base de datos
connectDB();

app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos (incluyendo userRegister.html)
app.use(express.static('public'));

// Ruta para manejar el registro de usuarios
app.post('/register', async (req, res) => {
  try {
    const { names, lastNames, typeID, ID,Role,user, password } = req.body;
    const newUser = new User({ names, lastNames, typeID, ID,Role,user, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
    console.error('Error al registrar usuario:', error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));