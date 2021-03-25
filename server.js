var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


var agoraToken = {
    token: '',
    channelName: ''
};
var agoraParams = {
    zMin: 0,
    zMax: 0,
    nStr: 0
}

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});


io.on('connection', (socket) => {

    console.log('a user connected');
    // socket.emit('agoraInfo', agoraToken);
    // socket.emit('agoraParams', agoraParams);

    socket.on('getAgoraInfo', function (data) {
        socket.emit('agoraInfo', agoraToken)
    })

    socket.on('getAgoraParams', function (data) {
        socket.emit('agoraParams', agoraParams)
    })

    socket.on('agoraInfo', function (data) {
        console.log('agoraInfo', data)
        agoraToken = data;
        socket.broadcast.emit('agoraInfo', data);

    });

    socket.on('agoraParams', function (data) {
        console.log('agoraParams', data)
        agoraParams = data;
        socket.broadcast.emit('agoraParams', data);
    })


    socket.on('light', (data) => {
        // console.log(data);
        io.emit('light', data);
    });

    socket.on('qlab', (data) => {
        io.emit('qlab', data);
    })

    socket.on('two-way', (data) => {
        io.emit('two-way', data);
    })

    socket.on('agora', (data) => {
        io.emit('agora', data);
        console.log('agora', data)
    })

    socket.on('scene', (data) => {
        io.emit('scene', data)
    })

});


http.listen(3000, () => {
    console.log('listening on *:3000');
});
