const express = require('express');
const router = express.Router();

const Controller = require('../controllers/medicines');

router.get('/showMedicines', Controller.showMedicines);

router.post('/register', Controller.register);

router.get('/getMedicine/:id', Controller.getMedicine);

router.post('/editMedicine', Controller.editMedicine); 

router.delete('/deleteMedicine/:id', Controller.deleteMedicine);

router.get('/lowStock', Controller.getLowStockMedicines);





module.exports = router;