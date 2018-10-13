const express = require('express');
const listController = require('../controllers/list.controller');

const ListsRouter = express.Router();

ListsRouter.post('/create', listController.createList);

ListsRouter.get('/', listController.getSavedLists);

ListsRouter.get('/:listID', listController.getList);

ListsRouter.put('/edit/:listID', listController.editList);

ListsRouter.delete('/deleteList/:listID', listController.deleteList);

module.exports = ListsRouter;