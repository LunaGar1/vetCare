const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const User = require('./models/userModel');
const Pet = require('./models/petModel');
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

//******* ROUTERS******* */

var user = require('./routers/user');
app.use('/user', user)

var pet = require('./routers/pet');
app.use('/pet', pet)

var login = require('./routers/login');
app.use('/login', login);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));