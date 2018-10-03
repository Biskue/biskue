module.exports = {
  createPoll: (req, res) => {
    res.status(200).send('create poll route')
  },
  getPoll: (req, res) => {
    const { pollID } = req.params;
    res.status(200).send(`get poll route pollID: ${pollID}`)
  },
  editPoll: (req, res) => {
    const { pollID } = req.params;
    res.status(200).send(`edit poll route pollID: ${pollID}`)
  },

}