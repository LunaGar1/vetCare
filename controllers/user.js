const userModel = require('../models/userModel');

async function register(req, res){
  try {
    const { names, lastNames, typeID, ID,Role,user, password } = req.body;
    const newUser = new userModel({ names, lastNames, typeID, ID,Role,user, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
    console.error('Error al registrar usuario:', error);
  }

}

module.exports = {
    register
}
