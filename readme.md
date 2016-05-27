# grunt-electron-packager-builder

Grunt tasks for working with electron, can run, compile and generate installers applications.

```
## I am working to improve this.
This task has many errors but works with:
    "electron-builder": "^3.25.*",
    "electron-packager": "^7.0.*",
    "electron-prebuilt": "^1.2.*",
    "electron-rebuild": "^1.1.*",
The task 'enstaller' (electron-builder) does not work well.
```

## Install
```sh
npm install grunt-electron-packager-builder --save-dev 
```

## Quick Setup for this task.
  Gruntfile.js 
```js
module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eplus:{
      run:{ 
        options:{
          appPath  :  './app' // default './app'
        }
      }
    },
    epack : {
      default:{
        options:{
          icon      : './app/recursos/icon', //Auto detect platform extension.
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-electron-packager-builder');
  grunt.registerTask('default', ['eplus:run']);
};
```

## Options and Documentation
Dependencies needed to run the tasks

```
npm install  electron-prebuilt --save-dev
npm install  electron-packager --save-dev
npm install  electron-builder --save-dev
npm install  electron-rebuild --save-dev
```
See the [electron-prebuilt](https://github.com/mafintosh/electron-prebuilt).

See the [electron-packager](https://github.com/maxogden/electron-packager).

See the [electron-builder](https://github.com/loopline-systems/electron-builder).

See the [electron-rebuild](https://github.com/electron/electron-rebuild).

Gruntfile.js

```js
module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eplus  :  {
      run : { 
        options : {
          appPath  :  './app' // default './app'
        }
      },
      debug : { 
        options : {
          appPath  :  './app',  // default './app'
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
          //name    : 'Electron app', // default (options.dir+'/packeger.json').name
          icon      : './app/recursos/icon', //Auto detect platform extension.
          dir       : './app',   // default ./app
          out       : './build'  // default ./build
        }
      },
      custom:{
        options: (platform,arch) => {
          return {
            platform,
            arch,
            icon : './app/recursos/icon'// Auto detect platform extension
          }
        }
      }
    }// epack  
  grunt.loadNpmTasks('grunt-electron-packager-builder');
  grunt.registerTask('default', ['eplus:run']);
};
```

## License
MIT © [Marani Matias Ezequiel](maranimatias@gmail.com)