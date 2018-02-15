/*var http = require('http');

var server = http.createServer(function(request, response){
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('<h1>The server is working!</h1>');
  response.end();
});
server.listen(8000);
*/
var http = require("http");
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;

switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('<h1>Hey, have you heard about our <a href="/signup.html">signup page</a></h1>');
            response.end();
            break;

        case '/signup.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                    response.end();
                }
                else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;

        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }
});

server.listen(8000);
console.log('require socket io');
var io = require('socket.io').listen(server);
io.on('connection', function(socket){
  console.log('a user connected now');
  socket.on('disconnect', function(){
      console.log('user disconnected');
  });
  //user logged in
  socket.on('user logged in', function(username){
    console.log('user logged in: ' + username);
    socket.on('message', function(msg){
      console.log('message: ' + msg + ', user:'+username);
      io.emit('message', {message: msg, user:username});
      socket.broadcast.emit('hi to any');
    });
  });
});
