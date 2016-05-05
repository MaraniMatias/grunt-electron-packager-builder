'use strict';
module.exports = function (grunt)  {
// nombre version y datos utiles
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
    }, // eplus

    ebuild : { // electron-packager
      default:{
        options: {
          version   : '0.37.8',
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
            version   : '0.37.8',
            icon      : './test/app/recursos/icon',
            dir       : './test/app',
            out       : './test/build'
          }
        }
      }
    },// ebuild
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
          appPath  :  './test/build/test-linux-ia32'
        }
      }
    }
  });
  
grunt.loadNpmTasks('grunt-contrib-jshint');
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
