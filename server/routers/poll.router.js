const express = require('express');
const pollController = require('../controllers/poll.controller');

const PollRouter = express.Router();

PollRouter.post('/createPoll', pollController.createPoll);

PollRouter.get('/retrieve/:pollID', pollController.getPoll);

PollRouter.put('/update/:pollID', pollController.editPoll);

<<<<<<< HEAD
PollRouter.get('/search', pollController.search);

module.exports = PollRouter;
=======
PollRouter.get('/search', pollController.search)

module.exports = PollRouter;
>>>>>>> master
