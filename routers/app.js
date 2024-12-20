const express = require('express');
const router = express.Router();

const Controller = require('../controllers/app');

router.post('/register', Controller.register);

router.get('/apps', Controller.getAppsByOwner);

router.get('/getAppsByVet/:vetID', Controller.getAppsByVet);

router.delete('/deleteApp/:id', Controller.deleteApp);

router.get('/getApp/:id', Controller.getApp);

router.put('/updateApp/:id', Controller.updateApp);

module.exports = router;