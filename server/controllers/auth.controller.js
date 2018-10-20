const bcrypt = require('bcryptjs');

module.exports = {
  register: (req, res) => {
    const user = req.body;
    var pwd = bcrypt.hashSync(user.password, 10);
    user.password = pwd;
    req.db.users
      .insert(user)
      .then(u => {
        req.session.user = u;
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
      .login_user(username)
      .then(u => {
        let user = u[0];
        req.session.user = user;
        if (bcrypt.compareSync(password, user.password)) {
          delete user.password;
          res.status(200).send(user);
        } else {
          res.status(401).send({ error: 'Invalid Username or password' });
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
        let user = u[0];
        if (u.length == 0) {
          res.status(404).send({ error: 'Invalid User ID' });
        } else {
          delete user.password;
          res.status(200).send(user);
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  editUser: (req, res) => {
    const { userID } = req.params;
    const { firstName, lastName, avatar, email, oldPassword, newPassword } = req.body
    const { type } = req.query;
    switch (type) {
      case 'newPassword':
        return req.db.get_user(userID)
          .then(async ([user]) => {
            if (bcrypt.compareSync(oldPassword, user.password)) {
              const pwd = await bcrypt.hashSync(newPassword, 10);
              req.db.update_password(userID, pwd)
              req.session.user = user;
              return res.status(200).send(`Password was successfully updated for User ID: '${userID}'`);
            } else {
              res.status(401).send({ error: 'Invalid Password' });
            }
          })
          .catch(err => {
            console.error(err);
            res.status(500).send({ error: err.message });
          })
        break;
      case 'profileEdit':
        req.db.edit_user(userID, firstName, lastName, avatar, email)
          .then(u => {
            let user = u[0];
            req.session.user = user;
            return res.status(200).send(user);
          })
          .catch(err => {
            res.status(500).send(err);
          })
        break;
      default:
        return res.status(500).send({ error: `Your request must include a 'type' of 'newPassword', or 'profileEdit'.` });
    }
  },
  logout: (req, res) => {
    if (req.session.user || req.cookies.user_sid) {
      res.clearCookie('user_sid');
      req.session.destroy();
      res.status(200).send({ message: 'You have logged out.'})
    }
  },
  verifyAuth: (req, res) => {
    if (req.session.user.email) {
      res.status(200).send(req.session.user)
    } else {
      res.status(401).send({message: 'You are not logged in.'})
    }
  },
};