define(function(require){
  var
    // Third Party dependencies
    jscss     = require('jscss')
  , domReady  = require('domReady')

    // App Dependencies
  , appCss  = require('css')
  , utils   = require('utils')
  , routes  = require('routes')
  , Views   = require('views')

    // Vars
    router = new utils.Router(routes)
  ;

  jscss.embed(jscss.compile(appCss));

  domReady(function(){
    // var appView = new Views.AppView();
    // document.body.appendElement(appView.render().el);
    router.listen();
  });
});