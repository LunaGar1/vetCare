const express = require('express');
const router = express.Router();

const {
    isAuthenticated,
    authorizeRoles
} = require('../middleware/auth');

const Controller = require('../controllers/user');


router.post(
    '/register',
    isAuthenticated,
    authorizeRoles('Admin'),
    Controller.register
);

router.get(
    '/showUsers',
    isAuthenticated,
    authorizeRoles('Admin'),
    Controller.showUsers
);

router.get(
    '/getUser/:ID',
    isAuthenticated,
    authorizeRoles('Admin'),
    Controller.getUserById
);

router.post(
    '/editUser',
    isAuthenticated,
    authorizeRoles('Admin'),
    Controller.editUser
);

router.delete(
    '/deleteUser/:id',
    isAuthenticated,
    authorizeRoles('Admin'),
    Controller.deleteUser
);

router.get(
    '/profile',
    isAuthenticated,
    Controller.renderProfile
);

router.get(
    '/getOneUser',
    isAuthenticated,
    Controller.getOneUser
);

router.post(
    '/updatePassword',
    isAuthenticated,
    Controller.updatePassword
);

router.delete(
    '/deleteOneUser',
    isAuthenticated,
    Controller.deleteOneUser
);

router.get(
    '/getAllVets',
    isAuthenticated,
    Controller.getAllVets
);


module.exports = router;