const express = require('express');
const router = express.Router();

const Controller = require('../controllers/medicines');

router.get('/showMedicines', Controller.showMedicines);

router.post('/register', Controller.register);




module.exports = router;