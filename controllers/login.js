const userModel = require('../models/userModel');

async function login(req, res){

    const { user, password } = req.body;

    try {
        const user2 = await userModel.findOne({ user });
        console.log(user2)
        if (user2) {

            if (user2.password === password) {
                
                req.session.userId = user2._id;
                return res.json(user2);
            } 
            else {
                return res.status(401).json({ error: 'Incorrect username or password' });
                //return res.send({ msg: "Contraseña incorrecta." });
            }
        } else {
            return res.status(404).json({ error: 'User not found' }); // Respuesta para usuario no encontrado
        }
    } catch (error) {
        return res.status(500).json({ error: 'BD error' });
    }

}

module.exports = {
    login
}