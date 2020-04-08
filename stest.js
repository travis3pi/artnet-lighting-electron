const {Receiver, objectify} = require('sacn');

const sACN = new Receiver({
    universes: [1],
    reuseAddr: true
    // see table 1 below for all options
});

sACN.on('packet', (packet) => {
    console.log('got dmx data:', objectify(packet.slotsData));
    // see table 2 below for all packet properties
});
