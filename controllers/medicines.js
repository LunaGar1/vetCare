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











module.exports = {
    showMedicines,
    register
}
