module.exports = {
  createList: (req, res) => {
    const ownerUserId  = req.session.user.id;
    const { latitude, longitude, listName, listItems} = req.body;
    const list = { ownerUserId, listName, latitude, longitude };
    req.db.favoriteLists.insert(list)
      .then(list => {
        const listId = list.id;
        listItems.map(item => {
          let newItem = {
            listId,
            listItem: item,
          }
          req.db.listItems.insert(newItem);
        })
        res.status(200).send(`Success! Here's your Favorite List Id: ${listId}`)
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ error: err.message });
      })
  },
  getSavedLists: (req, res) => {
    const ownerUserId  = req.session.user.id;
    req.db.get_favorite_lists(ownerUserId)
      .then(lists => {
        res.status(200).send(lists);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ error: err.message });
      })
  },
  getList:  (req, res) => {
    const ownerUserId  = req.session.user.id;
    const { listID } = req.params;
    req.db.get_list(ownerUserId, listID)
      .then(list => {
        res.status(200).send(list);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ error: err.message });
      })
  },
  editList: (req, res) => {
    const { listID } = req.params;
    const { type } = req.query;
    const { listName, listItem } = req.body;
    switch (type) {
      case 'addItem':
        return req.db.list_add_item(listID, listItem)
          .then(() => {
            res.status(200).send(`Item Id: '${itemId}' was successfully added to List Id: '${listID}'`)
          })
          .catch(err => {
            console.error(err);
            res.status(500).send({ error: err.message });
          })
      case 'removeItem':
        let itemId = listItem.itemId;
        return req.db.list_remove_item(listID, itemId)
          .then(() => {
            res.status(202).send({ message: `Item Id: '${itemId}' was successfully removed from List Id: '${listID}'`})
          })
          .catch(err => {
            console.error(err);
            res.status(500).send({ error: err.message });
          })
      case 'rename':
        return req.db.list_rename(listID, listName)
          .then(list => {
            res.status(200).send(list)
          })
          .catch(err => {
            console.error(err);
            res.status(500).send({ error: err.message });
          })
      default:
        return res.status(500).send({ error: `Your request must include a 'type' of 'addItem', 'removeItem', or 'rename'.`});
    }
  },
  deleteList:  (req, res) => {
    const { listID } = req.params;
    req.db.list_delete(listID)
      .then(() => {
        res.status(202).send(`Favorite List Id: '${listID}' was successfully deleted.`)
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ error: err.message });
      })
  },
}