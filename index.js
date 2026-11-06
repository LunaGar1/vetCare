require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;

console.log('MongoStore:', MongoStore);
console.log('Tipo de MongoStore:', typeof MongoStore);
console.log('Tipo de create:', typeof MongoStore.create);

const app = express();

// Validar variables de entorno
if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not configured');
}

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
}

// Configuración de Render
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Conectar MongoDB
connectDB();

// Middlewares generales
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Configuración de sesiones
app.use(session({
    name: 'vetcare.sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 24 * 60 * 60
    }),

    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Configuración de EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ruta principal
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Rutas
const user = require('./routers/user');
app.use('/user', user);

const pet = require('./routers/pet');
app.use('/pet', pet);

const login = require('./routers/login');
app.use('/login', login);

const appointment = require('./routers/app');
app.use('/app', appointment);

const medicines = require('./routers/medicines');
app.use('/medicines', medicines);

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
