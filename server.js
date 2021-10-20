var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors({
    origin: '*'
}))

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

app.get('/get-agora-info', (req, res) => {
    res.status(200).send({agoraToken, agoraParams});
});


app.post('/player/teleport', (req, res) => {
    if(req.body.token === 'O5v09foyha') {
        io.emit('teleportPlayer', {id: req.body.id, action: req.body.action})
        res.status(200).send('ok');
    }else{
        res.status(400).send('not authenticated');
    }
});

app.post('/teleport', (req, res) => {
    if(req.body.token === 'O5v09foyha'){
        io.emit('teleportAll', {scene: req.body.scene});
        res.status(200).send('ok');
    }else{
        res.status(400).send('not authenticated');
    }


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
        console.log(data)
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


http.listen(3001, () => {
    console.log('listening on *:3001');
});
