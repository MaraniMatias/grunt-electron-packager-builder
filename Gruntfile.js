/*
run electron
run electron degub
compilado pack
instalador build
*/
/*
const
  dirConfig     = './task-builder-config.json', 
  fs            = require('fs'),
  os            = require('os'),
  childProcess  = require('child_process'), 
  filePackage   = require('./app/package.json'),
  fileConfig    = require(dirConfig),
  electronPack  = require('electron-packager')
//  electron      = require('electron-prebuilt')
;
module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);
  
  grunt.registerTask('help', 'List of commands.', () => {
      grunt.log.subhead("Prerequisites if you're creating installers.");
      grunt.log.subhead("In OS X, via Homebrew.");
      grunt.log.writeln("brew install wine makensis");
      grunt.log.subhead("In Ubuntu.");
      grunt.log.writeln("sudo add-apt-repository ppa:ubuntu-wine/ppa -y");
      grunt.log.writeln("sduo apt-get update");
      grunt.log.writeln("sudo apt-get install wine nsis -y");
      
      grunt.log.subhead("grunt bulid:arg1:arg2");
      grunt.log.writeln("Compiled from the app ni ./build");
      grunt.log.writeln("arg1 all win32 linux darwin");
      grunt.log.writeln("arg2 all x64 ia32");
      grunt.log.writeln("To osx argument 'arg2' is not taken intoaccount.");
      
      grunt.log.subhead("grunt instaler:arg1,arg2");
      grunt.log.writeln("Create installer for the app in './build' config file using builder-config.json");
      grunt.log.writeln("arg1 all win32 linux darwin");
      grunt.log.writeln("arg2 all x64 ia32");
      
      //grunt.log.subhead("grunt clean");
      //grunt.log.error("Clean.","rm -rf ./build");
  });

  grunt.registerTask('builder', 'Compiled.', (platform,arch) => {
    grunt.log.writeln(`Compiled for ${fileConfig.app.name}-${platform}-${arch} in "./build".`);
        grunt.task.run(`xXXXx:build:${platform}:${arch}`);
  });//build
  
  grunt.registerTask('instaler', 'Installer for Electron app.', (platform,arch) => {
    grunt.log.writeln('Create installer for compilations in "./build/ins".');

  });//pack


  grunt.initConfig({
    zip: {
      linuxx64: {
        src: `./build/${fileConfig.app.name}-linux-x64/***`,
        dest: `./build/${fileConfig.app.name}-linux-x64.zip`
      },
      linuxia32: {
        src: `./build/${fileConfig.app.name}-linux-ia32/***`,
        dest: `./build/${fileConfig.app.name}-linux-ia32.zip`
      }
    },
    shell: {
      installer:{
        options: { execOptions: { maxBuffer: 1024 * 1024 * 64 } },
        command: (platform,arch) => { // win osx , ia32 x64
          return `electron-builder ./build/${fileConfig.app.name}-${platform}-${arch} --platform=${platform} --out=build/ins/${arch} --config=${dirConfig}`
        }
      },
      electron: {command: './node_modules/.bin/electron app'}
    },
    'electron-packager': {
			build: {
				options: (platform,arch) => {
          return {
            overwrite : true,
            platform  : platform,
            ignore    : 'bower.json',
            name      : fileConfig.app.name,
            arch      : arch,
            icon      : './app/recursos/icon',
            dir       : './app',
            out       : './build'         
          }
				}
			}
		},
    'electron-debian-installer': {
      options: {
        productName: fileConfig.app.name,
        productDescription: 'package.json.des',
        section: 'devel',
        priority: 'package.json.propiedad',
        lintianOverrides: [],
        categories: ['Utility'],
        rename: function (dest, src) {
          return dest + fileConfig.app.name+'_<%= version %>-<%= revision %>_<%= arch %>.deb';
        }
      },
      linuxia32: {
        options: { arch: 'i386'},
        src: './build/'+fileConfig.app.name+'-linux-ia32',
        dest: './build/ins/'
      },
      linuxx64: {
        options: { arch: 'amd64'},
        src: './build/'+fileConfig.app.name+'-linux-x64',
        dest: './build/ins/'
      }
    }
  });
};


*/

// @@@@@@@@@@@@@@@@@@@@@@@@@


'use strict';
module.exports = function (grunt)  {
// nombre version y datos utiles
	grunt.initConfig({
    eplus  :  {
      // options  :  { pkgApp   :  grunt.file.readJSON('./test/app/package.json') },
      run : { 
        options : {
          appPath  :  './test/app'
        }
      },
      debug : { 
        options : {
          appPath  :  './test/app',
          debug : true,
          port  :  5858
        }
      }
    },
    ebuild : { // electron-packager
      default:{
        options: {
          version   : '0.36.7',
          icon      : './test/app/recursos/icon',
          dir       : './test/app',
          out       : './test/build'
        }
      },
      custom:{
        options: (platform,arch) => {
          return {
            platform,
            arch,
            version   : '0.36.7',
            icon      : './test/app/recursos/icon',
            dir       : './test/app',
            out       : './test/build'
          }
        }
      }
    },
    einstaller  :  { // electron-bulider 
      options  :   {
        basePath  :  './test/app', // Path base the file config.json
        config    :   './test/app/builder.json', 
        out       :  './test/instaler'
      },
      all  : {
        options  :  {
          platform  :  'all',
          arch  :  'all'         
        }
      },
      win:{
        options: {
          platform: 'win',
          arch : 'all',
          //appPath   :  './test/build/test-win32-ia32'
        }
      },
      osx:{ // Only with mac os machine.
        options: {
          platform: 'osx',
          //appPath   :  './test/build/test-darwin-x64',
        }
      },
      linux:{
        options: {
          platform : 'linux',
          //appPath  :  './test/build/test-linux-x64'
        }
      }
    }
	});
  
	grunt.loadTasks('tasks');
	grunt.registerTask('default', [
    
	]);
};



/*
    
      if( ['win','win32'].includes(platform) && ['ia32','x64'].includes(arch) ){
        grunt.task.run('shell:installer:win:'+arch);
      }else 
      if( ['osx','darwin'].includes(platform) && ['ia32','x64'].includes(arch) ){
         grunt.task.run('shell:installer:osx:'+arch);
      }else 
      if( ['linux32','linux'].includes(platform) && ['ia32','x64'].includes(arch)  ){
         grunt.task.run('electron-debian-installer:linux'+arch);
      }else 
      if('all'==platform){
        if('ia32'==arch){
          grunt.task.run('shell:installer:win:ia32');
          grunt.task.run('shell:installer:osx:ia32');
          grunt.task.run('electron-debian-installer:linuxia32');
        }
        if('x64'==arch){
          grunt.task.run('shell:installer:win:x64');
          grunt.task.run('shell:installer:osx:x64');
          grunt.task.run('electron-debian-installer:linuxx64');
        }
        if('all'==arch){
          grunt.task.run('shell:installer:win:ia32');
          grunt.task.run('shell:installer:osx:ia32');
          grunt.task.run('shell:installer:win:x64');
          grunt.task.run('shell:installer:osx:x64');
          grunt.task.run('electron-debian-installer:linuxia32');
          grunt.task.run('electron-debian-installer:linuxx64');
        }
      }else{
        throw new Error(' platform [linux32,linux,win,win32,osx,darwin] \n arch [x64,ia32]');
      }
      
*/