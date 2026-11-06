
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

async function login(req, res) {
    try {
        const { user, password } = req.body;

        if (!user || !password) {
            return res.status(400).json({
                error: 'Username and password are required'
            });
        }

        const foundUser = await userModel.findOne({ user });

        if (!foundUser) {
            return res.status(401).json({
                error: 'Incorrect username or password'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            foundUser.hashedPassword
        );

        if (!isMatch) {
            return res.status(401).json({
                error: 'Incorrect username or password'
            });
        }

        // Regenerar la sesión después de autenticar
        req.session.regenerate((err) => {
            if (err) {
                console.error('Session regeneration error:', err);
                return res.status(500).json({
                    error: 'Error creating session'
                });
            }

            req.session.userId = foundUser._id.toString();

            const safeUser = {
                _id: foundUser._id,
                names: foundUser.names,
                lastNames: foundUser.lastNames,
                typeID: foundUser.typeID,
                ID: foundUser.ID,
                Role: foundUser.Role,
                user: foundUser.user
            };

            req.session.save((saveError) => {
                if (saveError) {
                    console.error('Session save error:', saveError);
                    return res.status(500).json({
                        error: 'Error saving session'
                    });
                }

                return res.status(200).json(safeUser);
            });
        });

    } catch (error) {
        console.error('Login error:', error.message);

        return res.status(500).json({
            error: 'Error processing login'
        });
    }
}

module.exports = { login };
