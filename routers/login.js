
const express = require('express');
const path = require('path');
const router = express.Router();

const Controller = require('../controllers/login');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML/login.html'));
});

router.post('/', Controller.login);

module.exports = router;
