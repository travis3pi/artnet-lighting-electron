const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.send('windowCreated');

ipcRenderer.on('newData', (event, newData) => {
    //console.log(newData);
    let currentChannel = $(`#a${newData.channel}`);

    currentChannel.css('width', `${newData.value / 255 * 100}%`);
    currentChannel.text(newData.value);

});
let channels = $('#channels');
for (var i = 0; i < 16; i++) {
    channels.append(`
<div class="channel-container">
        <p style="color: white">Address ${i + 1}</p>
        <div class="progress">
            <div id="a${i + 1}" class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="255" id="a1">${0}</div>
        </div>
</div>
<br>
`);
}

// socket.on('newConnection', () => {
//     let channels = $('#channels');
//
//
//         for(var i=0;i<16;i++) {
//             channels.append(`
// <div class="channel-container">
//         <p style="color: white">Address ${i+1}</p>
//         <div class="progress">
//             <div id="a${i+1}" class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="255" id="a1">${0}</div>
//         </div>
// </div>
// <br>
// `);
//         }
//
// });
