'use strict';
module.exports = function (grunt)  {

  grunt.initConfig({
    eplus : {
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
    }, // eplus
    epack : { // electron-packager
      default : {
        options : {
          icon : './app/recursos/cnc-ino.ico',
          out  : './build'
        }
      }/*,
      custom:{
        options: (platform,arch) => {
          return {
            platform,
            arch,
            icon      : './app/recursos/icon',
            out       : './build'
          }
        }
      }*/
    },// ebuild
    einstaller  :  { // electron-bulider 
      options  :   {
        config    :   './app/package.json', 
        out       :  './instaler'
      },
      all  : {
        options  :  {
          platform  :  'all',
          arch  :  'all'         
        }
      },
      win:{
        options: {
          platform: 'win32',
          arch : 'ia32',
          appPath   :  './app'
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
          appPath  :  './build/app-test-linux-x64'
        }
      }
    },
    jade: {      
      compile: {
        options: {
          data: {
            client: false,
            pretty: true,
            timestamp: "<%= grunt.template.today() %>",
            debug: false
          }
        },
        files: [ {
          cwd: "./app/views",
          src: "**/*.jade",
          dest: "./app/html/",
          expand: true,
          ext: ".html"
        } ]
      }
    },
    ts: {
      default : {
        src: ["**/*.ts", "!node_modules/**/*.ts","!**/*.d.ts"]
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-ts');
  //grunt.loadTasks('./../tasks');
  grunt.loadTasks('./tasks');
  grunt.registerTask('default', ['jade','ts']);
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
