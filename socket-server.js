const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
var exphbs  = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/run', (req, res) => {
    io.sockets.sockets.forEach(socket => {
        console.log('sending..');
        io.to(socket.id).emit('tests', socket.id);
    });
    return res.json('xxxx');
});


io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});