const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const path = require('path')
const ses = remote.session.fromPartition('persist:name')

function closeApp() {
    remote.getCurrentWindow().close();
}

function minimizeApp() {
    remote.getCurrentWindow().minimize();
}

function loginUser() {
    var username = $('#username').val();
    var password = $('#password').val();
    if (username.trim() !== "" && password.trim() !== "") {
        loginUserRequest(username, password);

        return false
    }
}

function createSecondWindow() {
    let win
    const width = remote.screen.getPrimaryDisplay().workAreaSize.width
    const height = remote.screen.getPrimaryDisplay().workAreaSize.height
        // Create the browser window.
    win = new BrowserWindow({
        width: width * 0.7,
        height: height * 0.8,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname, 'img/icon/icon.png'),
        minWidth: 1100,
        minHeight: 600
    })

    // and load the index.html of the app.
    win.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
    remote.getCurrentWindow().close();
    win.show()
}


function createObjectEditWindow() {
    let winOE
    const width = remote.screen.getPrimaryDisplay().workAreaSize.width
    const height = remote.screen.getPrimaryDisplay().workAreaSize.height
        // Create the browser window.
    winOE = new BrowserWindow({
        width: width * 0.5,
        height: height * 0.6,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname, 'img/icon/icon.png'),
        minWidth: 700,
        minHeight: 400
    })

    // and load the index.html of the app.
    winOE.loadFile('object.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    winOE.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        winOE = null
    })
    winOE.show();
}