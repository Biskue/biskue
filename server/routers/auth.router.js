const express = require('express');

const AuthRouter = express.Router();

AuthRouter.post('/register', (req, res) => {
    res.status(200).send('register route')
});

AuthRouter.post('/login', (req, res) => {
    res.status(200).send('login route')
});

AuthRouter.get('/info/:userID', (req, res) => {
    const { userID } = req.params;
    res.status(200).send(`get user info route; userID: ${userID}`)
});

AuthRouter.put('/edit/:userID', (req, res) => {
    const { userID } = req.params;
    res.status(200).send(`edit user info route; userID: ${userID}`)
});


module.exports = AuthRouter;