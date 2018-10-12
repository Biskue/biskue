const express = require('express');

require('dotenv').config({
    path: __dirname + '/../.env',
});
const {getDb} = require('./database/bootstrap.database')
const globalDecorator = require('./middleware/global-decorator.middleware');
const routerHub = require('./routers/hub.router');

const app = express();
const server = require('http').createServer(app);
const sharedSession = require('express-socket.io-session');  
const io = require('socket.io')(server);
io.use(sharedSession(globalDecorator.sessionMiddleWare, {
    autoSave:true
})); 


globalDecorator.globalDecorator(app);

routerHub(app);


app.use((err, req, res, next) => {
    res.status(500).send(err);
})

const port = process.env.SERVER_PORT || 4000;

server.listen(port, () => {
    console.log(`Server listening at localhost:${port}`);
}); 

app.get('/', function (req, res) {
    res.send({ response: 'I am alive'}).status(200);
  });
  
  io.on('connection', (socket) => {

    console.log(socket.handshake.session.user);

    socket.emit('news', { hello: 'world' });

    socket.on('room', room => {
        console.log(`Joining Socket Room ${room}`)
        socket.join(room);
        // io.sockets.in(room).emit('joined', req.session.user.firstName);
    })

    socket.on('connect', data => console.log(data));

    socket.on('message', (msg) => { console.log(msg) });

    socket.on('increment', (number, pollCode) => { 

        console.log(number);
        const incremented = number + 1;
        io.sockets.in(pollCode).emit('incremented', incremented);
    });

    socket.on('vote', (upOrDown, optionId, pollCode, index) => { 
        const db = getDb()
        if(upOrDown) {
            db.increment_vote([optionId])
                .then(result => io.sockets.in(pollCode).emit('incremented', result[0].upVotes, index))
                .catch(err => console.warn(err))
        } else {
            db.decrement_vote([optionId])
                .then(result => io.sockets.in(pollCode).emit('decremented', result[0].downVotes, index))
                .catch(err => console.warn(err))
        }
    });

    socket.on('disconnect', () => console.log('client disconnected'));

});