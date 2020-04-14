const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on('settingsData', (event, data) => {
    console.log(data);
    $('#ipAddress').val(data.ipAddress);
    $('#sendPort').val(data.sendPort);
})

$('#cancelButton').click(() => {
    console.log('cancel button clicked');
    ipcRenderer.send('settingsCancel');
})

$('#saveButton').click(() => {
    const data = {
        ipAddress: $('#ipAddress').val(),
        sendPort: Number.parseInt($('#sendPort').val())
    }
    console.log(data);
    ipcRenderer.send('saveSettings', data)
})
