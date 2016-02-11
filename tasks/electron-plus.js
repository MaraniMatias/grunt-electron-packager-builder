/* global process */
'use strict';
const 
fs = require('fs'),
os = require('os'),
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
    
    var defaultOpt = {
      platform  :  'all', // win, osx, linux
      arch      :  'all', // ia32, am64, all
      basePath  :  './app', // base path para config
      config    :  './app/builder.json',
      //config    :   grunt.file.readJSON('./test/app/builder.json'), 
      //appPath   :  './app',
      out       :  './instaler'
    };
    
    var options = this.options(defaultOpt);
    
    if(typeof this.data.options === 'function'){
      /*var options = this.data.options.apply(grunt, arguments);
      for (var key in defaultOpt) {
        if(options[key] === undefined ){
          options[key] = defaultOpt[key];
        }
      }*/
    }else{
      //var options = this.options(defaultOpt);
    }
    
    options.config = grunt.file.readJSON(options.config);
    let pck =grunt.file.readJSON(options.basePath+'/package.json');
        
    if(options.appPath === undefined){
//      var out = options.out;
      var platform = (options.platform === 'all')? ['darwin','win','linux'] : [options.platform];
      var arch = (options.arch === 'all')? ['x64','ia32'] : [options.arch];
      for (var i = 0; i < platform.length; i++) {
        var pla = platform[i] === 'darwin'?'osx': platform[i]; 
        if(options.config[pla].title === undefined) { options.config[pla].title = pck.name;}
        if(options.config[pla].version === undefined) { options.config[pla].version = pck.version;}
        if(options.config[pla].executable === undefined) { options.config[pla].executable = pck.name;}
        if(options.platform === 'osx'){ options.platform='darwin'; options.arch='x64'; }
        
        for (var j = 0; j < arch.length; j++) {
          var ar = arch[j];
          options.appPath = `./test/build/${pck.name}-${(options.platform === 'win')? options.platform='win32':options.platform}-${ar}` ;
          //fs.access( options.appPath , function (err) {
            options.platform = pla ;
            options.config[pla].arch  = (ar ==='ia32') ? 32:64;
//            options.out = out+'/'+ar;
            if( pla!=='osx' || ( pla==='osx' && os.platform() ==='darwin') ){
              builder.build( options , function (err) {
                if (err) {
                  grunt.warn(err);
                  return;
                }
              done();
              });
            }
          //});// fs
        }// for
      }// for
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

  /*
      console.log( this.name );
    //console.log( this.target );
    console.log( this.nameArgs );
    //console.log( this.data );
    //console.log( this.flags );
    //console.log( this.args );
    console.log( this.options() );
  
  */

/*
  grunt.log.subhead( this.name);
  grunt.log.write( this.target +'... ').ok();
  grunt.log.writeflags( this.data );
//  grunt.log.writeln( this.data );
*/  


/*
 {
      basePath  :  './test/app', // base path para config
      platform  :  'linux',
      appPath   :  './test/build/test-linux-x64',
      config    :   grunt.file.readJSON('./test/app/builder.json'), 
      out       :  './test/instaler'
      }
      
      */