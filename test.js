var udp = require('dgram');
const osc = require('osc-min');
// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');
var server2 = udp.createSocket('udp4');

// emits when any error occurs
server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});

server.on('message', (message) => {
    console.log(message[18]);
    if (message[18] !== undefined) {
        var buf = osc.toBuffer({
            address: "/lighting",
            args: [
                1,
                message[18]
            ]
        });
        return server2.send(buf, 0, buf.length, 2365, "localhost");
    }

});

// var buf = osc.toBuffer({
//     address: "/lighting",
//     args: [
//         1,
//         2
//     ]
// });
// server2.send(buf, 0, buf.length, 2365, "localhost");

server.bind(6454);
