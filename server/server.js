const express = require('express');

require('dotenv').config({
    path: __dirname + '/../.env',
});

const globalDecorator = require('./middleware/global-decorator.middleware');
const routerHub = require('./routers/hub.router');

const app = express();
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

globalDecorator(app);

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
  
  io.on('connection', socket => {

    socket.emit('news', { hello: 'world' });

    socket.on('room', room => {
        console.log(`Joining Socket Room ${room}`)
        socket.join(room);
    })

    socket.on('connect', data => console.log(data));

    socket.on('message', (msg) => { console.log(msg) });

    socket.on('increment', (number, pollCode) => { 
        console.log(number);
        const incremented = number + 1;
        io.sockets.in(pollCode).emit('incremented', incremented);
    });

    socket.on('disconnect', () => console.log('client disconnected'));

});