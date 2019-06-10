var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var socketsConectados = [];

io.on('connection', function (socket) {
  socket.emit('conectado', null);
  socket.on('chat', function (data) {
    console.log(data);
    socketsConectados.forEach(
        function myFunction(sock) {
          if(socket != sock){
            console.log("Se envia mensaje a socket");
            sock.emit('chat', data);
          }
          else{
            console.log("No se envia. socket emisor");
          }
        }
    );
  });

  socketsConectados.push(socket); 

  console.log("agregó socket "+socketsConectados.length);

});



