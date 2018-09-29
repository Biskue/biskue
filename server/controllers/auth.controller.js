module.exports = {
  register: (req, res) => {
    res.status(200).send('register route')
  },
  login: (req, res) => {
    res.status(200).send('login route')
  },
  getUser:  (req, res) => {
    const { userID } = req.params;
    res.status(200).send(`get user info route; userID: ${userID}`)
  },
  editUser:  (req, res) => {
    const { userID } = req.params;
    res.status(200).send(`edit user info route; userID: ${userID}`)
  },
}