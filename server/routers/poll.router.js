const express = require('express');
const pollController = require('../controllers/poll.controller');

const PollRouter = express.Router();

PollRouter.post('/createPoll', pollController.createPoll);

PollRouter.get('/retrieve/:pollID', pollController.getPoll);

PollRouter.put('/update/:pollID', pollController.editPoll);

PollRouter.get('/search', pollController.search);

PollRouter.post('/join/:pollID', pollController.joinPoll);

PollRouter.put('/vote/:pollID', pollController.vote);

PollRouter.get('/winners/:pollID', pollController.retrieveWinners);

PollRouter.put('/setWinner/:pollID', pollController.setWinner);

PollRouter.get('/retrieveUsers/:pollCode', pollController.listPollUsers);

PollRouter.get('/retrieveChat/:pollCode', pollController.getChat);

module.exports = PollRouter;
PollRouter.get('/search', pollController.search)