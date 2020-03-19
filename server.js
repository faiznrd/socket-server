const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = [];
app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;
server.listen(port);
io.on('connection', socket => {
  socket.on('join', data => {
    console.log(data + ' has joined the chat');
    io.emit('join', data);
  });
  socket.on('useradded', function(data){
    users[socket.id] = data;
    id = socket.id;
    io.emit('connected', {user: users[socket.id], id: id});
  });
  socket.on('kirimed', function(data){
    socket.broadcast.emit('kirimed', {class:'orang', msg:data, name: users[socket.id], id: socket.id});
    socket.emit('kirimed', {class:'gw', msg:data, id: socket.id});

  });
  socket.on('typing', function(data){
    if (data.typing == true) {
      socket.broadcast.emit('tampilTyping', data);
    }else{
      socket.broadcast.emit('tampilTyping', data);
    }

  });
});
