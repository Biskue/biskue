const AuthRouter = require('./auth.router');
const ListsRouter = require('./lists.router');
const PollRouter = require('./poll.router');

function routerHub(app) {
    app.use('/auth', AuthRouter);
    app.use('/lists', ListsRouter);
    app.use('/poll', PollRouter);
}

module.exports = routerHub;