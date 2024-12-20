const medicineModel = require('../models/medicineModel.js');

const showMedicines = async (req, res) => {
    try {
        const medicines = await medicineModel.find({});
        console.log(medicines);
        return res.render('showMedicines', {medicines})
    } catch (error) {
        return res.status(500).send('Error showing medicines');
    }
};


async function register(req, res){
    try {
      const { name, price, stock} = req.body;
  
      const existingName = await medicineModel.findOne({ name });
          if (existingName) {
              return res.status(400).json({ error: 'The name is already in use.' });
        }
  
      const newMedicine = new medicineModel({ name, price, stock});
      await newMedicine.save();
      res.status(201).json({ message: 'Successfully registered the medicine' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering the medicine', error });
      console.error('Error registering the medicine', error);
    }
  
  };

  const getMedicine = async (req, res) => {
    try {
        const medicineId = req.params.id; 
        const medicine = await medicineModel.findById(medicineId); 

        if (!medicine) {
            return res.status(404).send('Medicine not found');
        }

        res.json(medicine); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching medicine');
    }
};

const editMedicine = async (req, res) => {
  const { idUpdate, nameUpdate, priceUpdate, stockUpdate } = req.body;

  try {
  
      const medicine = await medicineModel.findById(idUpdate);
      if (!medicine) {
          return res.status(404).json({ error: 'Medicine not found' });
      }

      medicine.name = nameUpdate;
      medicine.price = priceUpdate;
      medicine.stock = stockUpdate;

      const lowStockMedicines = await medicineModel.find({ stock: { $lte: 5 } });
      await medicine.save(); 
      ;

      return res.status(200).json({
          message: 'Medicine updated successfully',
          lowStockMedicines,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          error: 'Error updating medicine',
          message: error.message
      });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await medicineModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting medicine', error: error.message });
  }
};

const getLowStockMedicines = async (req, res) => {
  try {
      const medicines = await medicineModel.find({ stock: { $lte: 5 } });
      res.status(200).json(medicines);
      console.log(medicines); 
  } catch (error) {
      console.error('Error fetching low-stock medicines:', error);
      res.status(500).json({ error: 'Error fetching low-stock medicines' });
  }
};



module.exports = {
    showMedicines,
    register,
    getMedicine,
    editMedicine,
    deleteMedicine,
    getLowStockMedicines
}
