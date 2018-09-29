const express = require('express');
const pollController = require('../controllers/poll.controller')

const PollRouter = express.Router();

PollRouter.post('/createPoll' , pollController.createPoll); 

PollRouter.get('/retrieve/:pollID' , pollController.getPoll);

PollRouter.put('/update/:pollID' , pollController.editPoll);

module.exports = PollRouter;