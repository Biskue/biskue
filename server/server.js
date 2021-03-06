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



globalDecorator.globalDecorator(app);

io.use(sharedSession(globalDecorator.sessionMiddleWare, {
    autoSave:true
})); 

routerHub(app);

app.use( express.static( `${__dirname}/../build` ) );
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

    socket.on('room', room => {
        console.log(`Joining Socket Room ${room}`)
        socket.join(room);
        if(socket.handshake.session.user){
            
            io.sockets.in(room).emit('joined', socket.handshake.session.user.username);
        }
     
    })

    socket.on('connect', data => console.log(data));

    socket.on('message', (msg, pollCode, pollId) => { 
        const db = getDb()
        if(socket.handshake.session.user) {
            db.chat_insert_message(pollId, socket.handshake.session.user.username, msg)
                .then(result => io.sockets.in(pollCode).emit('newMessage', socket.handshake.session.user.username, msg)) 
                .catch(err => console.warn(err))
        }
     });

    socket.on('newUser', (user, pollCode) => {
        io.sockets.in(pollCode).emit('joined', user);
        socket.handshake.session.user = {username: user};
        socket.handshake.session.save();
    })

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

    socket.on('end', (pollCode) => {
        const db = getDb()
        db.close_poll(pollCode)
            .then(result => io.sockets.in(pollCode).emit('closePoll'))
            .catch(err => console.warn(err))
    });

    socket.on('disconnect', () => console.log('client disconnected'));

});

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})