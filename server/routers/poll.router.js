const express = require('express');

const PollRouter = express.Router();

PollRouter.post('/createPoll' , (req, res) => {
    res.status(200).send('create poll route')
});

PollRouter.get('/retrieve/:pollID' , (req, res) => {
    const { pollID } = req.params;
    res.status(200).send(`get poll route pollID: ${pollID}`)
});

PollRouter.put('/update/:pollID' , (req, res) => {
    const { pollID } = req.params;
    res.status(200).send(`edit poll route pollID: ${pollID}`)
});

module.exports = PollRouter;