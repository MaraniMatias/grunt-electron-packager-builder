/// <reference path="./node_modules/electron-builder/out/electron-builder.d.ts"/>
'use strict';
const 
electronPackager = require('electron-packager'),
electronBuilder  = require('electron-builder'),

electronPath = './node_modules/.bin/electron',
fs = require('fs'),
os = require('os'),
path = require('path'),
childProcess = require('child_process')
;

module.exports = function (grunt) {



//################################################################
grunt.registerMultiTask('einstaller', 'Create installers for Electron app.  (electron-builder)', function () {
    var done = this.async();
    if (this.data.options === undefined) throw new Error('`options` required');
    
    const defaultOpt = {
      platform  :  'win32', // win, osx, linux
      arch      :  'ia32', // ia32, x64, all
      basePath  :  './app', // base path para config
      config    :  './package.json',
      out       :  './build',
      //config    :   grunt.file.readJSON('./app/package.json'), 
      appPath   :  './app',
      buildPath   :  './build'
    };
   
    var options = this.options(defaultOpt);

    options.config = grunt.file.readJSON(options.config);
    var pck =grunt.file.readJSON(options.basePath+'/package.json');

electronBuilder.build(this.options(defaultOpt))
               .then(() => {grunt.log.ok("fin"); })
    
function eBuild(options){
  
    fs.access( options.appPath, fs.W_OK , function (err) {
      if (err)  grunt.log.error("We can not find: ",options.appPath);
      else {
        // Promise is returned 
        electronBuilder.build(defaultOpt)
        .then(() => {
          // handle result 
          grunt.log.ok("fin");
        })
        .catch((error) => {
          // handle error 
        })
      }
    });// fs

}// eBuild
});
//################################################################



grunt.registerMultiTask('epack', 'Package Electron. (electron-packager)', function () {
  var done = this.async();
  if (this.data.options === undefined)  throw new Error('`options` required');
  const defaultOpt = {
    overwrite : true,
    platform  : 'all',
    arch      : 'all',
    dir       : './app',
    out       : './build'
  };

  if(typeof this.data.options === 'function'){
    var options = this.data.options.apply(grunt, arguments);
    for (let key in defaultOpt) {
      if(options[key] === undefined ) options[key] = defaultOpt[key];
    }
  }else{
    var options = this.options(defaultOpt);
  }
  if(options.platform === 'osx'){options.platform='darwin'}
  if(options.platform === 'win'){options.platform='win32'}
  
  fs.access('./app' , function (err) {
    electronPackager(options, function (err) {
      if (err)  grunt.warn(err);
      else  grunt.log.ok('Done... out in ',options.out);
      done();
    });
  });
});// epack
grunt.registerMultiTask('eplus', 'Electron Plus.', function() { this.async();
  const options = this.options({ appPath : './app', debug : false, port  :  5858 });
  if(options.debug)  childProcess.spawn(electronPath, ['--debug='+options.port,options.appPath], { stdio: 'inherit' }); 
  else childProcess.spawn(electronPath, [options.appPath], { stdio: 'inherit' }); 
});// eplus
}; // grunt