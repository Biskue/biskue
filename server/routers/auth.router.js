const express = require('express');
const authController = require('../controllers/auth.controller');

const AuthRouter = express.Router();

AuthRouter.post('/register', authController.register);

AuthRouter.post('/login', authController.login);

AuthRouter.get('/login', authController.verifyAuth);

AuthRouter.get('/info/:userID', authController.getUser);

AuthRouter.put('/edit/:userID', authController.editUser);

AuthRouter.post('/logout', authController.logout);

module.exports = AuthRouter;