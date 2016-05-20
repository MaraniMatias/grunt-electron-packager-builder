angular
.value('cnc',{
  arduino:false,
  file:{
    name:'Sin Archivo.'
  }
})
.directive('checkbox', function () {
  return {
    link: function (scope, element, attrs) {
        element.checkbox();
    }
  }
})
/*
.directive('popupElement', function () {
  return {
    link: function (scope, element, attrs) {
      element.popup({ 
        title    : 'My favorite dog',
        content  : 'My favorite dog would l',
        position : 'top center',
        variation : 'inverted'
      });
    }
  }
})*/
;