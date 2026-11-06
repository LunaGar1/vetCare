const appModel = require('../models/appModel');

async function register(req, res) {
    try {
        const { vetName, vetID, petName, datetime, ownerID } = req.body;

        const appointmentDate = new Date(datetime);

        if (isNaN(appointmentDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid appointment date'
            });
        }

        const existingApp = await appModel.findOne({
            vetID: vetID,
            datetime: appointmentDate
        });

        if (existingApp) {
            return res.status(409).json({
                message: 'The appointment is taken at this time'
            });
        }

        const newApp = new appModel({
            vetName,
            vetID,
            petName,
            datetime: appointmentDate,
            ownerID
        });

        await newApp.save();

        return res.status(201).json({
            message: 'Successfully scheduled appointment'
        });

    } catch (error) {
        console.error('Error scheduling appointment:', error);

        return res.status(500).json({
            message: 'Error to schedule appointment',
            error: error.message
        });
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
        const { vetName, vetID, petName, datetime, ownerID } = req.body;

        const appointmentDate = new Date(datetime);

        if (isNaN(appointmentDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid appointment date'
            });
        }

        const existingApp = await appModel.findOne({
            vetID: vetID,
            datetime: appointmentDate,
            _id: { $ne: appId }
        });

        if (existingApp) {
            return res.status(409).json({
                message: 'The appointment is taken at this time'
            });
        }

        const updatedApp = await appModel.findByIdAndUpdate(
            appId,
            {
                vetName,
                vetID,
                petName,
                datetime: appointmentDate,
                ownerID
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedApp) {
            return res.status(404).json({
                message: 'Appointment not found'
            });
        }

        return res.status(200).json({
            message: 'Appointment updated successfully',
            app: updatedApp
        });

    } catch (error) {
        console.error('Error updating appointment:', error);

        return res.status(500).json({
            message: 'Error updating appointment',
            error: error.message
        });
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