var http = require('http'),
  url = require('url'),
  fs = require('fs'),
    io = require('socket.io'),
  amqp = require('amqp'),
  sys = require(process.binding('natives').util ? 'util' : 'sys');

server = http.createServer(function(req, res){ 
 // your normal server code 
  var path = url.parse(req.url).pathname;
  switch (path){
  //case '/json.js':
  case '/':
  fs.readFile(__dirname + "/index.html", function(err, data){
        if (err) return send404(res);
        res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'})
        res.write(data, 'utf8');
        res.end();
      });
      break;
 }
}).listen(3000);

var socket = io.listen(server); 
var connection = amqp.createConnection({ host: '127.0.0.1' });

connection.addListener('ready', function(){
  var queue = connection.queue('graph')

  socket.on('connection', function(client){
    client.on('disconnect', function() {

    });
  });

  queue.subscribe(function(message){
console.log(message);
    socket.emit('graph', message.data.toString());
  });
});
 
