'use strict'
angular.controller('main',
[ 'notify','ipc','cnc','$scope',( notify,ipc,cnc,$scope) => {

  $scope.cnc = cnc;

  ipc.send('arduino');
  ipc.on('arduino-res', (event, obj) => {
    cnc.arduino = obj.type === 'success' ;
    notify( obj.msg, obj.type );
  });
  
  $scope.setFile = () => {
    ipc.send('open-file', arrayLine );
  }
  ipc.on('open-file-res', (event, file) => {
    if ( file ){
      console.log(file);
      $scope.artculos.push({etiqueta:'new file',detalles:file});
      notify( file.name );    
    }
  });


  $scope.artculos = [{
    etiqueta:"Lapiz",
    detalles:"Detalles Art 3",
    agregar:1,
    img:"../recursos/icon.svg",
    precio:13.43,
    disponible:78
  },{
    etiqueta:"Goma de borrar",
    detalles:"Detalles Art 4",
    agregar:1,
    img:"../recursos/icon.svg",
    precio:5.23,
    disponible:3
  },{
    etiqueta:"Regla",
    detalles:"Detalles Art 1",
    agregar:1,
    img:"../recursos/icon.svg",
    precio:11,
    disponible:3
  },{
    etiqueta:"Birome",
    detalles:"Detalles Art 2",
    agregar:1,
    img:"../recursos/icon.svg",
    precio:3.23,
    disponible:3
  }];
    
  //addMessage('as','ticketElegido','dddd',2);
  function loadinng(b){$scope.loading = b? 'active':''}
  $scope.artSelect = function(index){};  
  $scope.$watch('', function() { }, true);
}]);