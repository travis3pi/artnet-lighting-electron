var socket = require('socket.io-client')('http://artnet-server-vr-club.tmkinteractive.com:3000');
var osc = require('osc');


var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 53001,
    metadata: true
});

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
    console.log("An OSC message just arrived!", oscMsg);

    if (oscMsg.address === '/qlab') {
        console.log('It is a qlab command');
        console.log(oscMsg.args[0].value);
        console.log('spped: ', oscMsg.args[1].value);
    }

    // console.log("Remote info is: ", info);
    socket.emit('qlab', oscMsg);
});


socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnect from server')
});

// Open the socket.
udpPort.open();
