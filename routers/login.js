const express = require('express');
const router = express.Router();

const Controller = require('../controllers/login');

router.post('/', Controller.login);

module.exports = router;