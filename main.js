const {app, BrowserWindow, ipcMain} = require('electron');
const osc = require('osc');

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    win.loadFile('index.html');

    // Open the DevTools.
    win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }

});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true
});

udpPort.open();

var udp = require('dgram');
var dataArray = {data: []};

//Pre populate dataArray

for (let i = 0; i < 16; i++) {
    dataArray.data[i] = {channel: i + 1, value: 50}
}


var udpserver = udp.createSocket('udp4');

// emits when any error occurs
udpserver.on('error', function (error) {
    console.log('Error: ' + error);

});


udpserver.bind(6454);

ipcMain.on('windowCreated', event => {
    udpserver.on('message', (message) => {
        console.log(message[18]);
        for (var i = 0; i < 16; i++) {
            if (dataArray.data[i].value !== message[i + 18]) {
                dataArray.data[i].value = message[i + 18];
                //console.log('NEW DATA');
                event.sender.send('newData', dataArray.data[i]);
                udpPort.send({
                    address: "/unity_lighting",
                    args: [
                        {
                            type: "i",
                            value: dataArray.data[i].channel
                        },
                        {
                            type: "i",
                            value: dataArray.data[i].value
                        }
                    ]
                }, "127.0.0.1", 57110);

            }
        }
    });
});

