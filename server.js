var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var colors = require('colors');

app.get('/', function(req, res){
  res.send("HI :)");
});

io.on('connection', function(socket){
  console.log('welcome ' + socket.id + '!');
  socket.on('chat message', function(data){
    var info = 'message: ' + '[' + data.username + ']: ' + data.msg;
    console.log(info.yellow);
    io.emit('chat message', data);
  });
});

var port = parseInt(process.env.PORT || "3000");
http.listen(port, function(){
  console.log('listening on *:3000');
});
