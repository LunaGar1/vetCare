const express = require('express');
const router = express.Router();

const Controller = require('../controllers/medicines');

router.get('/showMedicines', Controller.showMedicines);





module.exports = router;