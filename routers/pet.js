const express = require('express');
const router = express.Router();

const Controller = require('../controllers/pet');

router.post('/register', Controller.register);

module.exports = router;