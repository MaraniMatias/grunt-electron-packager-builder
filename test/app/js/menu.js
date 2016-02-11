/* global remote */
/* global ipcRenderer */
const Menu = remote.require('menu');
      
      window.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      menu.popup(remote.getCurrentWindow());
      }, false);
      
const template = [
  {
    label: 'Archivo',
    submenu: [
      { label: 'Imprimir :D',
        click: function() { 
          ipcRenderer.send('imprimir');
        }  
      },
      { label: 'MenuItem2', type: 'checkbox', checked: true },
      {
        label:'File',
        accelerator: 'CmdOrCtrl+F',
        click: function() { 
          ipcRenderer.send('file');
        }
      },
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        type: 'separator'
      },
       {
        label: 'Preferancia ipcRenderer',
        click: function(item, focusedWindow) { 
          ipcRenderer.send('show-prefs');
        }
      }
    ]
  },
  {
    label: 'Heramientas',
    submenu: [
      {
        label: 'Calcladora',
        accelerator: 'CmdOrCtrl+M',
        click: function(item, focusedWindow) {
          ipcRenderer.send('show-calc');
        }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Alt+Command+I';
          else
            return 'Ctrl+Shift+I';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.toggleDevTools();
        }
      },
    ]
  }
];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);