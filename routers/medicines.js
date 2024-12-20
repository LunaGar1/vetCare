const express = require('express');
const router = express.Router();

const Controller = require('../controllers/medicines');

router.get('/showMedicines', Controller.showMedicines);

router.post('/register', Controller.register);

router.delete('/deleteMedicine/:id', Controller.deleteMedicine);




module.exports = router;