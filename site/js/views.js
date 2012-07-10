define(function(require){
  var
    // Dependencies
    utils = require('utils')

    // Vars
  , Views = {};
  ;

  Views.Appview = utils.View.extend({
    className: 'app-container'
  , events: {

    }
  , initialize: function(options){
      this.subViews = {

      };
      return this;
    }
  , render: function(){

      return this;
    }
  });

  return Views;
});