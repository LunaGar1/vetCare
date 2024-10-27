const userModel = require('../models/userModel');

async function login(req, res){

    const { user, password } = req.body;

    try {
        const user2 = await userModel.findOne({ user });
        console.log(user2)
        if (user2) {

            if (user2.password === password) {
                
                res.send(user2);
            } 
            else {
                return res.send({ msg: "Contraseña incorrecta." });
            }
        } else {
            res.send('Usuario no encontrado')
        }
    } catch (error) {
        res.send({"msg": "Error mongo"});
    }

}



module.exports = {
    login
}