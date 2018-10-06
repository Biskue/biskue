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
    const { password, firstName, lastName, avatar, email } = req.body
    var pwd = bcrypt.hashSync(password, 10);
    req.db.edit_user(userID, pwd, firstName, lastName, avatar, email)
    .then(u => {
      let user = u[0];
      delete user.password;
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },
  logout: (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.redirect('/');
    }
  },
  verifyAuth: (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.status(200).send(req.session.user)
    } else {
      res.status().send({message: 'user is not logged in'})
    }    
  },
};