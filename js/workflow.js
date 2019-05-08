const remote = require('electron').remote;

function closeApp() {
    remote.getCurrentWindow().close();
}

function minimizeApp() {
    remote.getCurrentWindow().minimize();
}