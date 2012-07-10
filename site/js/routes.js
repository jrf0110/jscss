define(function(require){
  var
    utils = require('utils')
  ;
  return {
    "": {
      enter: function(){
        console.log("Welcome to the app!");
      }
    , exit: function(){
        console.log("Goodbye to the homepage!");
      }
    }
  };
});