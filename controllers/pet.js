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
    console.log('ownerid', req.query)
    const ownerIdParam = req.query.ownerId; 
    const pets = await petModel.find({ "ownerID": ownerIdParam });
    console.log('pets', await pets);
    await res.json(pets);
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    res.status(500).json({ message: 'Error al obtener las mascotas' });
  }
};


const getPet = async (req, res) => {
  try {
      const petId = req.params.id;
      const pet = await petModel.findById(petId);

      if (!pet) {
          return res.status(404).json({ message: 'Pet not found' });
      }

      res.status(200).json(pet);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching pet', error: error.message });
  }
};


const updatePet = async (req, res) => {
  try {
      const petId = req.params.id;
      const { name, age, sex, type, breed } = req.body;

      const updatedPet = await petModel.findByIdAndUpdate(
          petId,
          { name, age, sex, type, breed },
          { new: true, runValidators: true }
      );

      if (!updatedPet) {
          return res.status(404).json({ message: 'Pet not found' });
      }

      return res.status(200).json({ message: 'Pet updated successfully', pet: updatedPet });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating pet', error: error.message });
  }
};



const deletePet = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await petModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Pet deleting user', error: error.message });
  }
};

module.exports = {
    register,
    getPetsByOwner,
    getPet,
    updatePet,
    deletePet,
}