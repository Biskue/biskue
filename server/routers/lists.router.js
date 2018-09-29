const express = require('express');

const ListsRouter = express.Router();

ListsRouter.post('/create', (req, res) => {
    res.status(200).send('create list route')
});

ListsRouter.get('/savedLists/:userID', (req, res) => {
    const { userID } = req.params;
    res.status(200).send(`get saved lists by user route; userID: ${userID}`)
});

ListsRouter.get('/list/:listID', (req, res) => {
    const { listID } = req.params;
    res.status(200).send(`get list by list id; listID: ${listID}`)
});

ListsRouter.put('/edit/:listID', (req, res) => {
    const { listID } = req.params;
    res.status(200).send(`edit list by list id; listID: ${listID}`)
});

ListsRouter.delete('/deleteList/:listID', (req, res) => {
    const { listID } = req.params;
    res.status(200).send(`delete list by list id; listID: ${listID}`)
});

module.exports = ListsRouter;