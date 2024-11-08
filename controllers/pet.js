const petModel = require('../models/petModel');

async function register(req, res){
  try {
    const { name, age, sex, type, breed, ownerID } = req.body;
    const newPet = new petModel({ name, age, sex, type, breed, ownerID});
    await newPet.save();
    res.status(201).json({ message: 'Pet registered' });
  } catch (error) {
    res.status(500).json({ message: 'Error to register pet', error });
    console.error('Error to register pet', error);
  }

}

async function getPetsByOwner(req, res) {
  try {
    const ownerIdParam = req.query.ownerId; 
    const pets = await petModel.find({ "ownerID": ownerIdParam });
    await res.json(pets);
    
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    res.status(500).json({ message: 'Error al obtener las mascotas' });
  }
};

module.exports = {
    register,
    getPetsByOwner
}