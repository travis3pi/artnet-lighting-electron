var app = require('express')();
var socket = require('socket.io-client')('http://artnet-server-vr-club.tmkinteractive.com:3000');


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
    res.send('<h1>Hello world!</h1>');
});

server.on('message', (message) => {
    // console.log(message[18]+', '+ message[19]+', ' + message[20]);
    for (let i = 18; i < 500; i++) {
        if (!(i % 3)) {
            // console.log((i / 3) - 5)
            socket.emit('light', {id: (i / 3) - 5, r: message[i], g: message[i + 1], b: message[i + 2]});
        }
    }
})


socket.on('testMessage', (data) => {
    console.log(data);
})

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnect from server')
});


server.bind(6454);

