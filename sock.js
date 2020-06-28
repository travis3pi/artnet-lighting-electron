var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


var udp = require('dgram');
var server = udp.createSocket('udp4');

var lightArray = [];
var oldLightArray = [];

// emits when any error occurs
server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});


app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.on('message', (message) => {
    // console.log(message[18]+', '+ message[19]+', ' + message[20]);
    for (let i = 18; i < 500; i++) {
        if (!(i % 3)) {
            // console.log((i / 3) - 5)
            io.emit('light', {id: (i / 3) - 5, r: message[i], g: message[i + 1], b: message[i + 2]});
        }
    }
})

io.on('connection', (socket) => {
    console.log('Client connected');
    io.emit('light', {id: 1, r: 255, g: 100, b: 200});

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })

});
server.bind(6454);
http.listen(3000, () => {
    console.log('listening on *:3000');
});
