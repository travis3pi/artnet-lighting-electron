var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('light', (data) => {
        // console.log(data);
        io.emit('light', data);
    });


});


http.listen(3000, () => {
    console.log('listening on *:3000');
});