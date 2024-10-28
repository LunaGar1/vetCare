const petModel = require('../models/petModel');

async function register(req, res){
  try {
    const { name, date, sex, type, breed, ownerID } = req.body;
    const newPet = new petModel({ name, date, sex, type, breed, ownerID});
    await newPet.save();
    res.status(201).json({ message: 'Pet registered' });
  } catch (error) {
    res.status(500).json({ message: 'Error to register pet', error });
    console.error('Error to register pet', error);
  }

}

module.exports = {
    register
}