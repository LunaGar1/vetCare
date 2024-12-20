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











module.exports = {
    showMedicines
}
