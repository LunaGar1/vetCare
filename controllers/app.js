const appModel = require('../models/appModel');

async function register(req, res) {
    try {
      const { vetName, vetID, petName, datetime, ownerID} = req.body;

      const date = await appModel.find({ "datetime": datetime, "vetName": vetName });
      
      if (date.length > 0) {
        res.status(500).json({ message: 'The appointment is taken at this time' })
      } else {
        const newApp = new appModel({ vetName, vetID, petName, datetime, ownerID});
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

async function getAppsByVet(req, res) {
  try {
    const vetID = req.params.vetID; 
    const apps = await appModel.find({"vetID": vetID});
    await res.json(apps);
    
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ message: 'Error al obtener las citas' });
  }
};

const getApp = async (req, res) => {
  try {
      const appId = req.params.id;
      const app = await appModel.findById(appId);

      if (!app) {
          return res.status(404).json({ message: 'Appointment not found' });
      }

      res.status(200).json(app);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching appointment', error: error.message });
  }
};

const updateApp = async (req, res) => {
  try {
      const appId = req.params.id;
      const { vetName, petName, datetime, ownerID } = req.body;

      const date = await appModel.find({ "datetime": datetime, "vetName": vetName });
      
      if (date.length > 0) {
        res.status(500).json({ message: 'The appointment is taken at this time' })
      } else {
        const updatedApp = await appModel.findByIdAndUpdate(
          appId, { vetName, petName, datetime, ownerID }, { new: true, runValidators: true }
        )
        if (!updatedApp) {
          return res.status(404).json({ message: 'Appointment not found' });
        }
        return res.status(200).json({ message: 'Appointment updated successfully', app: updatedApp });
      }    
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
};

const deleteApp = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await appModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Pet deleting user', error: error.message });
  }
};


module.exports = {
    register,
    getAppsByOwner,
    getApp,
    updateApp,
    deleteApp,
    getAppsByVet
}