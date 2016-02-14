# grunt-electron-packager-builder

Grunt tasks for working with electron, can run, compile and generate installers applications.

## Install

```sh
npm install grunt-electron-packager-builder --save-dev 
```

## Usage
```js
module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eplus  :  {
      run : { 
        options : {
          appPath  :  './app' // default '.'
        }
      },
      debug : { 
        options : {
          appPath  :  './app',  // default '.'
          debug : true,  // default false
          port  :  5858  // default 5858
        }
      }
    },
    ebuild : { // electron-packager
      default:{
        options: {
          //overwrite : true,     // default true
          //platform  : 'all',    // default all
          //arch      : 'all',    // default all
          //version   : '0.36.7', // default auto set
          //name    : 'Titule Electron app', // default (options.dir+'/packeger.json').name
          icon      : './app/recursos/icon', //according to auto detect platform extension.
          dir       : './app',   // default ./app
          out       : './build'  // default ./build
        }
      },
      custom:{
        options: (platform,arch) => {
          return {
            platform,
            arch,
            icon      : './app/recursos/icon'  // according to auto detect platform extension
          }
        }
      }
    },// ebuild
    einstaller  :  { // electron-bulider 
      options  :   {
        //platform  :  'all', // default all // win, osx, linux
        //arch      :  'all', // default all // ia32, am64, all
        //appPath   :  './app', // default ./app
        //basePath  :  './app', // default ./app // Path base for the file config.json 
        config    :   './task-builder-config.json', // default ./app/builder.json
        buildPath   :  './build', // default ./build
        out       :  './build/instaler'  // default ./dist
      },
      // all  : { options:{ platform  :  'all', arch  :  'all' } }, // next version
      win32:{
        options: {
          platform: 'win',
          arch : 'ia32'
          //appPath   :  './CNC-ino-win32-ia32' // path  buildPath/appPath
        }
      },
      win64:{
        options: {
          platform: 'win',
          arch : 'x64'
          //appPath   :  './CNC-ino-win32-x64' // path  buildPath/appPath
        }
      },
      linux64:{
        options: {
          platform : 'linux',
          arch : 'x64'
          //appPath  :  './CNC-ino-linux-ia32'
        }
      },
      linux32:{
        options: {
          platform : 'linux',
          arch : 'ia32'
          //appPath  :  './CNC-ino-linux-x64'
        }
      },
      osx:{ // Only with mac os machine.
        options: {
          platform: 'osx',
          arch : 'x64'
          //appPath   :  './CNC-ino-darwin-x64',
        }
      }
    } // einstaller
  });
  
  grunt.loadNpmTasks('grunt-electron-packager-builder');
  grunt.registerTask('default', ['eplus:run']);
};
```
### builder.json
```json
{
  "app": {
    "name": "CNC-ino",
    "version": "0.0.1"
  },
  "osx": {
    "title": "CNC-ino",
    "icon": "./app/recursos/icon.icns",
    "icon-size": 80,
    "contents": [
      {"x": 438,"y": 344,"type": "link","path": "/Applications"},
      {"x": 192,"y": 344,"type": "file"}
    ]
  },
  "win": {
    "title": "CNC-ino",
    "icon": "./app/recursos/icon.ico",
    "version": "0.0.1"
  },
  "linux": {
    "target": "deb",
    "version": "0.1.2",
    "icon": "./app/recursos/icon.ico",
    "title": "CNC-ino"
  }
}
```
## Options and Documentation

See the [electron-prebuilt](https://github.com/mafintosh/electron-prebuilt).

See the [electron-packager](https://github.com/maxogden/electron-packager).

See the [electron-builder](https://github.com/loopline-systems/electron-builder).

## Example

tree -L 2 -a
```
.
├── app
│   ├── app.js
│   ├── bower.json
│   ├── components
│   ├── css
│   ├── html
│   ├── js
│   ├── lib
│   ├── node_modules
│   ├── package.json
│   └── recursos
├── Gruntfile.js
├── package.json
├── README.md
├── task-builder-config.json
...
```

grunt ebuild:default
```
...
├── build
│   ├── CNC-ino-darwin-x64
│   ├── CNC-ino-linux-ia32
│   ├── CNC-ino-linux-x64
│   ├── CNC-ino-win32-ia32
│   ├── CNC-ino-win32-x64
...
```

grunt einstaller
```
...
├── build
└── instaler
    ├── CNC-ino-0.1.2-amd64.deb
    ├── CNC-ino-0.1.2-i386.deb
    ├── CNC-ino-32-Setup.exe
    └── CNC-ino-64-Setup.exe
```

## License
MIT © [Marani Matias Ezequiel](maranimatias@gmail.com)
