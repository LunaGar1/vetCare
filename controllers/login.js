const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

async function login(req, res){

    const { user, password } = req.body;

    try {
        const user2 = await userModel.findOne({ user });
        console.log(user2)
        if (user2) {
            const isMatch = await bcrypt.compare(password, user2.hashedPassword);
            if (isMatch) {
                req.session.userId = user2._id;
                return res.json(user2);
            } 
            else {
                return res.status(401).json({ error: 'Incorrect username or password' });
            }
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'BD error' });
    }

}

module.exports = {
    login
}