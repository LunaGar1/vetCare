
const User = require('../models/userModel');

// Comprueba si el usuario inició sesión
function isAuthenticated(req, res, next) {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({
            message: 'Debes iniciar sesión para acceder a este recurso'
        });
    }

    next();
}

// Comprueba si el usuario tiene uno de los roles permitidos
function authorizeRoles(...allowedRoles) {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.session.userId)
                .select('Role');

            if (!user) {
                return res.status(401).json({
                    message: 'La sesión no es válida'
                });
            }

            if (!allowedRoles.includes(user.Role)) {
                return res.status(403).json({
                    message: 'No tienes permisos para realizar esta acción'
                });
            }

            next();

        } catch (error) {
            console.error('Error verificando permisos:', error.message);

            return res.status(500).json({
                message: 'Error al verificar los permisos'
            });
        }
    };
}

module.exports = {
    isAuthenticated,
    authorizeRoles
};
