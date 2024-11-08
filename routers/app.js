const express = require('express');
const router = express.Router();

const Controller = require('../controllers/app');

router.post('/register', Controller.register);

router.get('/apps', Controller.getAppsByOwner);

module.exports = router;