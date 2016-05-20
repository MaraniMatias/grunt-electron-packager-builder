/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/github-electron/github-electron.d.ts" />
const dirBase   =  `file://${__dirname}/html/`;
import * as fs from 'fs';
import {app,BrowserWindow,ipcMain,dialog,Menu,Tray,powerSaveBlocker,globalShortcut} from 'electron';
import {Arduino} from './lib/main';
const  fileConfig  =  require('./package.json');

app.on('window-all-closed',  () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

var mainWindow  : any;
var prefsWindow : any;

// to not display the default menu to start
var menu = Menu.buildFromTemplate( [] );
Menu.setApplicationMenu(menu);

app.on('ready',  () => {

  mainWindow = new BrowserWindow({
    disableAutoHideCursor  :  false, // Default false
    autoHideMenuBar  :  false, // Default false
    backgroundColor  :  '#F5F5F5', // Default #FFF 
    useContentSize   :  true,
    skipTaskbar      :  false, // Default false
    alwaysOnTop      :  false, // Default false
    fullscreen       :  false, // Default false
    frame            :  true, // Default true
    type             :  null , // On Linux, desktop, dock, toolbar, splash, notification.  On OS X, desktop, textured
    //webPreferences 
    //icon       :  appIcon,
    center     :  true,
    minWidth   :  960, 
    minHeight  :  600,
    //maxWidth   :  960, 
    //maxHeight  :  600,
    title      :  fileConfig.name
  });
  mainWindow.loadURL(dirBase+'index.html');
  //mainWindow.on('page-title-updated',  () => { console.log('title'); });
  mainWindow.on('closed',  () => {
    mainWindow = null;
    if (process.platform != 'darwin') {
      app.quit();
    }
  });

  // Open the devtools.
  //mainWindow.openDevTools();
  mainWindow.setProgressBar(0.7);
  
  // ver como informar ala capa superior de que termino
  mainWindow.on('blur',()=>{
    globalShortcut.unregisterAll();
  });
  mainWindow.on('focus',()=>{
    function globalShortcutSendComand (cmd : string){
       console.log(cmd);
    }
    globalShortcut.register('q', () => { globalShortcutSendComand('Q'); });
    globalShortcut.register('e', () => { globalShortcutSendComand('E'); });
    globalShortcut.register('d', () => { globalShortcutSendComand('D'); });
    globalShortcut.register('a', () => { globalShortcutSendComand('A'); });
    globalShortcut.register('w', () => { globalShortcutSendComand('W'); });
    globalShortcut.register('s', () => { globalShortcutSendComand('S'); });
    globalShortcut.register('Space', () => { globalShortcutSendComand('Space'); });
  });
  
  prefsWindow = new BrowserWindow({
    width: 400, height: 400,
    resizable:false, show:false,
    skipTaskbar:true , title:'Preferencias.'
  }); 
  prefsWindow.loadURL(dirBase+'prefe.html');
});//ready

ipcMain.on('arduino', (event, arg) => {
  var ard = new Arduino();
  event.sender.send('arduino-res',ard);
  console.log(ard);
});

ipcMain.on('open-file',(event,initialLine) => {
  event.sender.send('open-file-res',
    dialog.showOpenDialog({
      title : fileConfig.name,
      filters: [{ name: 'G-Code', extensions: ['txt', 'gcode'] },{ name: 'All Files', extensions: ['*'] }],
      properties: [ 'openFile' ] 
    })
  );
});

ipcMain.on('about', (event, arg) => {
  var chosen = dialog.showMessageBox( mainWindow, {
    cancelId  :  0,
    type     :  'info',
    title    :  'Acerca De',
    buttons  :  ['Aceptar'],
    message  :  'app-test, Electron and NodeJS',
    detail   :  'pensado para probar un plugin de grunt and electron. \n\tMarani Matias Ezequiel.'
  });
  // if (chosen == 0)  mainWindow.destroy();
});

ipcMain.on('show-prefs', function(event, status) {
  prefsWindow.show();
});
ipcMain.on('hide-prefs', function(event, status) {
  prefsWindow.hide();
});
  
/*
Event: ‘suspend’
Event: ‘resume’
Event: ‘on-ac’
Event: ‘on-battery’
*/