var texto="";

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    $ = require('jquery'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');
    pantalla = fs.readFileSync(__dirname + '/pantalla.html');
// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    if(req.url == '/pantalla'){
    res.end(pantalla);}else{
        if(req.url == '/jquery.js'){
            res.end(fs.readFileSync(__dirname + '/jquery.js'));
        }else {if(req.url == '/jquery-ui.js'){
            res.end(fs.readFileSync(__dirname + '/jquery-ui.js'));
        }else{
        res.end(index);
    } 
    }
}
});



// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time to all connected clients
// Send current time every 10 secs
//setInterval(sendTime, 1000);


// Emit welcome message on connection
io.on('connection', function(socket) {
	
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.on('color', function(data){
                                io.sockets.emit('colore', {color:data.color});
                                //console.log(data.color);
                                    });
});

app.listen(3000);

