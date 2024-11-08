const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

async function register(req, res){
  try {
    const { names, lastNames, typeID, ID,Role,user, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingID = await userModel.findOne({ ID });
        if (existingID) {
            return res.status(400).json({ error: 'The ID is already in use.' });
        }

        const existingUsername = await userModel.findOne({ user });
        if (existingUsername) {
            return res.status(400).json({ error: 'The username is already in use.' });
        }

    const newUser = new userModel({ names, lastNames, typeID, ID,Role,user, hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Successfully registered user' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering the user', error });
    console.error('Error registering the user', error);
  }

};

const renderProfile = async (req, res) => {
  if (!req.session.userId) {
      return res.redirect('../HTML/login.html');
  }

  try {
      const user = await userModel.findById(req.session.userId);
      if (!user) {
          return res.status(404).send('User no found');
      }
      res.render('profile', { user });
  } catch (err) {
      res.status(500).send('Error searching for user');
  }
};

const getOneUser = async (req, res) => {
  if (req.session.userId) {
    userModel.findById(req.session.userId)
      .then(user => {
        if (user) {
          res.json(user); 
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'Error fetching user' });
      });
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
};

const getAllVets = async (req, res) => {

  // if (req.session.userId) {
    userModel.find({ "Role": "Vet" }).then(vets => {
      if (vets) {
        res.send(vets); 
      } else {
        res.status(404).json({ error: 'Vets not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error fetching Vets' });
    });
  // } else {
  //   res.status(401).json({ error: 'User not authenticated' });
  // }
};


const updatePassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await userModel.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (newPassword.length < 12) {
      return res.status(400).json({ error: 'New password must be at least 12 characters long' });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.hashedPassword);

      if (isSamePassword) {
        return res.status(400).json({
          error: 'New password cannot be the same as the current password'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.hashedPassword = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating password' });
  }
};


const deleteOneUser = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const result = await userModel.findByIdAndDelete(req.session.userId);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ message: 'Error deleting user session' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};





const showUsers = async (req, res) => {
  try {
      const users = await userModel.find({});
      console.log(users);
      return res.render('showUsers', {users: users})
  } catch (error) {
      return res.status(500).send('Error showing users');
  }
};

const getUserById = async (req, res) => {
  try {
      const userId = req.params.ID;
      const user = await userModel.findOne({ID: userId});

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
  } catch (error) {
      console.error('Error retrieving user data:', error);
      res.status(500).json({ message: 'Error retrieving user data' });
  }
};


const editUser = async (req, res) => {
  const { IDupdate, namesUpdate, lastNamesUpdate, typeIDupdate, RoleUpdate, userUpdate, passwordUpdate } = req.body;

  try {
    const user = await userModel.findOne({ ID: IDupdate });

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    if (passwordUpdate) {
      const isSamePassword = await bcrypt.compare(passwordUpdate, user.hashedPassword);

      if (isSamePassword) {
        return res.status(400).json({
          error: 'New password cannot be the same as the current password'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(passwordUpdate, salt);

      await userModel.findOneAndUpdate(
        { ID: IDupdate },
        {
          ID: IDupdate,
          names: namesUpdate,
          lastNames: lastNamesUpdate,
          typeID: typeIDupdate,
          role: RoleUpdate,
          username: userUpdate,
          hashedPassword: hashedPassword
        },
        { new: true }
      );

      return res.status(200).json({
        message: 'User updated successfully'
      });
    } else {
      await userModel.findOneAndUpdate(
        { ID: IDupdate },
        {
          ID: IDupdate,
          names: namesUpdate,
          lastNames: lastNamesUpdate,
          typeID: typeIDupdate,
          Role: RoleUpdate,
          username: userUpdate
        },
        { new: true }
      );

      return res.status(200).json({
        message: 'User updated successfully'
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error editing user',
      error: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};




module.exports = {
    register,
    renderProfile,
    getOneUser,
    updatePassword,
    deleteOneUser,
    showUsers,
    getUserById,
    editUser,
    deleteUser,
    getAllVets
};

