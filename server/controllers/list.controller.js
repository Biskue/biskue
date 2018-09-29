module.exports = {
  createList: (req, res) => {
    res.status(200).send('create list route')
  },
  getSavedLists: (req, res) => {
    const { userID } = req.params;
    res.status(200).send(`get saved lists by user route; userID: ${userID}`)
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