const express = require('express');
const listController = require('../controllers/list.controller');

const ListsRouter = express.Router();

ListsRouter.post('/create', listController.createList);

ListsRouter.get('/savedLists/:userID', listController.getSavedLists);

ListsRouter.get('/list/:listID', listController.getList);

ListsRouter.put('/edit/:listID', listController.editList);

ListsRouter.delete('/deleteList/:listID', listController.deleteList);

module.exports = ListsRouter;