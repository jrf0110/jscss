define(function(require){
  var
    // Third Party dependencies
    jscss     = require('jscss')
  , domReady  = require('domReady')
  , PaperBoy  = require('paper-boy')

    // App Dependencies
  , appCss  = require('css/css')
  , utils   = require('utils')
  , routes  = require('routes')
  , Views   = require('views')

    // Vars
    router = new PaperBoy(routes)
  ;

  jscss.embed(jscss.compile(appCss));

  domReady(function(){
    // var appView = new Views.AppView();
    // document.body.appendElement(appView.render().el);
    router.listen();
  });
});