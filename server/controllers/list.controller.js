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
    const { listID } = req.params;
    res.status(200).send(`get list by list id; listID: ${listID}`)
  },
  editList: (req, res) => {
    const { listID } = req.params;
    res.status(200).send(`edit list by list id; listID: ${listID}`)
  },
  deleteList:  (req, res) => {
    const { listID } = req.params;
    res.status(200).send(`delete list by list id; listID: ${listID}`)
  },
}