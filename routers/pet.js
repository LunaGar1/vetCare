const express = require('express');
const router = express.Router();

const Controller = require('../controllers/pet');

router.post('/register', Controller.register);

router.get('/pets', Controller.getPetsByOwner);

router.delete('/deletePet/:id', Controller.deletePet);

router.get('/getPet/:id', Controller.getPet);  

router.put('/updatePet/:id', Controller.updatePet); 

module.exports = router;