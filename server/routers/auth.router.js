const express = require('express');
const authController = require('../controllers/auth.controller');

const AuthRouter = express.Router();

AuthRouter.post('/register', authController.register);

AuthRouter.post('/login', authController.login);

AuthRouter.get('/info/:userID', authController.getUser);

AuthRouter.put('/edit/:userID', authController.editUser);


module.exports = AuthRouter;