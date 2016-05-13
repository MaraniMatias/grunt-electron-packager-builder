"use strict";
var dirBase = "file://" + __dirname + "/html/";
var electron_1 = require('electron');
var main_1 = require('./lib/main');
var fileConfig = require('./package.json');
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
var mainWindow;
var prefsWindow;
var menu = electron_1.Menu.buildFromTemplate([]);
electron_1.Menu.setApplicationMenu(menu);
electron_1.app.on('ready', function () {
    mainWindow = new electron_1.BrowserWindow({
        disableAutoHideCursor: false,
        autoHideMenuBar: false,
        backgroundColor: '#F5F5F5',
        useContentSize: true,
        skipTaskbar: false,
        alwaysOnTop: false,
        fullscreen: false,
        frame: true,
        type: null,
        center: true,
        minWidth: 960,
        minHeight: 600,
        title: fileConfig.name
    });
    mainWindow.loadURL(dirBase + 'index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
        if (process.platform != 'darwin') {
            electron_1.app.quit();
        }
    });
    mainWindow.setProgressBar(0.7);
    mainWindow.on('blur', function () {
        electron_1.globalShortcut.unregisterAll();
    });
    mainWindow.on('focus', function () {
        function globalShortcutSendComand(cmd) {
            console.log(cmd);
        }
        electron_1.globalShortcut.register('q', function () { globalShortcutSendComand('Q'); });
        electron_1.globalShortcut.register('e', function () { globalShortcutSendComand('E'); });
        electron_1.globalShortcut.register('d', function () { globalShortcutSendComand('D'); });
        electron_1.globalShortcut.register('a', function () { globalShortcutSendComand('A'); });
        electron_1.globalShortcut.register('w', function () { globalShortcutSendComand('W'); });
        electron_1.globalShortcut.register('s', function () { globalShortcutSendComand('S'); });
        electron_1.globalShortcut.register('Space', function () { globalShortcutSendComand('Space'); });
    });
    prefsWindow = new electron_1.BrowserWindow({
        width: 400, height: 400,
        resizable: false, show: false,
        skipTaskbar: true, title: 'Preferencias.'
    });
    prefsWindow.loadURL(dirBase + 'prefe.html');
});
electron_1.ipcMain.on('arduino', function (event, arg) {
    var ard = new main_1.Arduino();
    event.sender.send('arduino-res', ard);
    console.log(ard);
});
electron_1.ipcMain.on('open-file', function (event, initialLine) {
    event.sender.send('open-file-res', electron_1.dialog.showOpenDialog({
        title: fileConfig.name,
        filters: [{ name: 'G-Code', extensions: ['txt', 'gcode'] }, { name: 'All Files', extensions: ['*'] }],
        properties: ['openFile']
    }));
});
electron_1.ipcMain.on('about', function (event, arg) {
    var chosen = electron_1.dialog.showMessageBox(mainWindow, {
        cancelId: 0,
        type: 'info',
        title: 'Acerca De',
        buttons: ['Aceptar'],
        message: 'app-test, Electron and NodeJS',
        detail: 'pensado para probar un plugin de grunt and electron. \n\tMarani Matias Ezequiel.'
    });
});
electron_1.ipcMain.on('show-prefs', function (event, status) {
    prefsWindow.show();
});
electron_1.ipcMain.on('hide-prefs', function (event, status) {
    prefsWindow.hide();
});
//# sourceMappingURL=app.js.map