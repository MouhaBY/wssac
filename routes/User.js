const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User');
const auth = require('../middlewares/auth');


router.get('/all', userCtrl.getAllUsers);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', userCtrl.getOneUser);
router.put('/user/:id', userCtrl.modifyUser);
router.delete('/user/:id', userCtrl.deleteUser);

module.exports = router;