const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const User = require('./models/userModel');
const Pet = require('./models/petModel');
const App = require('./models/appModel');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const app = express();

connectDB();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));



//******* ROUTERS******* */
app.use(session({
    secret: 'my_safe_chain',
    resave: false,
    saveUninitialized: true,
}));

// Configuración de EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var user = require('./routers/user');
app.use('/user', user)

var pet = require('./routers/pet');
app.use('/pet', pet)

var login = require('./routers/login');
app.use('/login', login);

var appointment = require('./routers/app');
app.use('/app', appointment);

var medicines = require('./routers/medicines');
app.use('/medicines', medicines);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));