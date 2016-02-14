/* global process */
'use strict';
const 
fs = require('fs'),
os = require('os'),
path = require('path'),
childProcess = require('child_process'),
builder  = require('electron-builder').init(),
packager = require('electron-packager'),
electron = require('electron-prebuilt')
;

module.exports = function (grunt) {
  
  grunt.registerMultiTask('einstaller', 'Create installers for Electron app.', function () {

    var done = this.async();
    if (this.data.options === undefined) {
      throw new Error('`options` required');
    }
    
    function _build(options){
      options.appPath = path.normalize(options.buildPath +'/'+ options.appPath);
      options.config['linux'].arch  = (options.arch ==='ia32') ? 32:64;
      options.config['win'].arch  = (options.arch ==='ia32') ? 32:64;
      options.config['osx'].arch  = (options.arch ==='ia32') ? 32:64;
      grunt.log.ok(options.appPath);
        fs.access( options.appPath , function (err) {
          if (err) {
            grunt.log.error(err);// return; 
          }else{
          if( options.platform!=='osx' || ( options.platform==='osx' && os.platform() === 'darwin') ){
            builder.build( options , function (err) {
              if (err) {
                grunt.log.error(err); // return;
              }
              fs.rename(
                path.resolve(options.out+'/'+options.config['win'].title+' Setup.exe'),
                path.resolve(options.out+'/'+options.config['win'].title+'-'+options.config['win'].arch+'-Setup.exe')
                ,function (err) { }
              );
              done();
            });
          }
        }
      })
    }
    
    var defaultOpt = {
      platform  :  'all', // win, osx, linux
      arch      :  'all', // ia32, am64, all
      basePath  :  './app', // base path para config
      config    :  './app/builder.json',
      out       :  './dist',
      //config    :   grunt.file.readJSON('./test/app/builder.json'), 
      //appPath   :  './app',
      buildPath   :  './build'
    };
    var options = this.options(defaultOpt);
    
    /*if(typeof this.data.options === 'function'){
      var options = this.data.options.apply(grunt, arguments);
      for (var key in defaultOpt) {
        if(options[key] === undefined ){
          options[key] = defaultOpt[key];
        }
      }
    }else{
      var options = this.options(defaultOpt);
    }*/
    
    options.config = grunt.file.readJSON(options.config);
    let pck =grunt.file.readJSON(options.basePath+'/package.json');
    
    if(options.appPath === undefined){
      // para path  'darwin','win32','linux'
      // para config 'osx','win','linux'
      var pathOut = options.out;
      if(options.platform === 'all'){
        var pathPlatform = {osx : 'darwin',win : 'win32','linux' : 'linux'};
      }else if(options.platform === 'osx'){
        var pathPlatform = {osx : 'darwin'};
      }else if(options.platform === 'win'){
        var pathPlatform = {win : 'win32'};
      }else if(options.platform === 'linux'){
        var pathPlatform = {linux : 'linux'};
      }
      var configPlatform = (options.platform === 'all') ? ['osx','win','linux'] : [options.platform];

var pla = options.platform;
//      for (var i = 0; i < configPlatform.length; i++) {
//        var pla = configPlatform[i];
        if(options.config[pla].title === undefined) { options.config[pla].title = pck.name;}
        if(options.config[pla].version === undefined) { options.config[pla].version = pck.version;}
        if(options.config[pla].executable === undefined) { options.config[pla].executable = pck.name;}
        options.platform = pla ;
//        if(options.arch === 'all'){
//          ['ia32','x64'].forEach((arch, index, array) => {
//            options.appPath  = './'+pck.name+'-'+pathPlatform[pla]+'-'+arch;
//            _build(options);
//          })
//        }else{
          options.appPath  = './'+pck.name+'-'+pathPlatform[pla]+'-'+options.arch;
          _build(options);
//        }
//      }// for
    }else{
      _build(options);
    }

  });

  grunt.registerMultiTask('eplus', 'Electron Plus.', function(task,platform,arch) {
    this.async();
    // Controlar que este espesificado lo necesario
      /*
      if (this.data.options === undefined) {
      throw new Error('`options` required');
      }
      */
    // defaults
    var options = this.options({
      appPath : '.',
      debug : false,
      port  :  5858
    });   
    
    // Run or Debug
    if(options.debug){
      childProcess.spawn(electron, ['--debug='+options.port,options.appPath], { stdio: 'inherit' }); 
    }else{
      childProcess.spawn(electron, [options.appPath], { stdio: 'inherit' }); 
    }
  });

  grunt.registerMultiTask('ebuild', 'Electron-plus -> Build',  function ()  {   
    var done = this.async();
    if (this.data.options === undefined) {
      throw new Error('`options` required');
    }
    var defaultOpt = {
      overwrite : true,
      platform  : 'all',
      arch      : 'all',
      dir       : './app',
      out       : './build'
    };
    if(typeof this.data.options === 'function'){
      var options = this.data.options.apply(grunt, arguments);
      for (var key in defaultOpt) {
        if(options[key] === undefined ){
          options[key] = defaultOpt[key];
        }
      }
    }else{
     var options = this.options(defaultOpt);
    }
    
    if(options.name === undefined) {grunt.file.readJSON(options.dir+'/package.json').name}

    if(options.platform === 'osx'){options.platform='darwin'}
    if(options.platform === 'win'){options.platform='win32'}
    
    fs.access(options.dir , function (err) {
      /*if (err){
        throw new Error('`dir` required - path the app');
      }*/
      packager(options, function (err,appPath)  {
        if (err) {
          grunt.warn(err);
          return;
        }else{
          grunt.log.ok(appPath.join('\n'));
        }
        done();
      });
    });
  });

}; // grunt
