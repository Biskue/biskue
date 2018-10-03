module.exports = {
  register: (req, res) => {
    const { user } = req.body;
    req.db.users
      .insert(user)
      .then(u => {
        delete u.password;
        res.status(201).send(u);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  login: (req, res) => {
    const { username, password } = req.body;
    req.db
      .login_user(username, password)
      .then(u => {
        if (u.length == 0) {
          res.status(401).send({ error: 'Invalid Username or password' });
        } else {
          delete u.password;
          res.status(200).send(u);
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getUser: (req, res) => {
    const { userID } = req.params;
    req.db
      .get_user(userID)
      .then(u => {
        if (u.length == 0) {
          res.status(404).send({ error: 'Invalid User ID' });
        } else {
          delete u.password;
          res.status(200).send(u);
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  editUser: (req, res) => {
    const { userID } = req.params;
    const { password, firstName, lastName, avatar, email } = req.body
    req.db.edit_user(userID, password, firstName, lastName, avatar, email)
    .then(u => {
      delete u.password;
      res.status(200).send(u);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
};