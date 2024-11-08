const express = require('express');
const router = express.Router();

const Controller = require('../controllers/user');

router.post('/register', Controller.register);

router.get('/profile', Controller.renderProfile);

router.get('/showUsers', Controller.showUsers);

router.get('/getVets', Controller.getVets);

module.exports = router;