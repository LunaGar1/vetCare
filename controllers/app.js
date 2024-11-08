const appModel = require('../models/appModel');

async function register(req, res) {
    try {
      const { vetName, petName, datetime, ownerID} = req.body;

      const date = await appModel.find({ "datetime": datetime, "vetName": vetName });
      
      if (date.length > 0) {
        res.status(500).json({ message: 'The appointment is taken at this time' })
      } else {
        const newApp = new appModel({ vetName, petName, datetime, ownerID});
        await newApp.save();
        res.status(201).json({ message: 'Successfully scheduled appointment' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error to schedule appointment', error });
      
    }
  
}

async function getAppsByOwner(req, res) {
  try {
    const ownerIdParam = req.query.ownerId; 
    const apps = await appModel.find({ "ownerID": ownerIdParam });
    await res.json(apps);
    
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ message: 'Error al obtener las citas' });
  }
};


module.exports = {
    register,
    getAppsByOwner
}