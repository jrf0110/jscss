(function(){
  var PaperBoy = (function(){
    var constructor = function(routes){
      this.enter = {};
      this.exit = {};
      this.scopes = {};
      for (var route in routes){
        if (typeof routes[route] === "object"){
          if (routes[route].hasOwnProperty('enter')) this.enter[route] = routes[route].enter;
          if (routes[route].hasOwnProperty('exit')) this.exit[route] = routes[route].exit;
        }else this.enter[route] = routes[route];
        this.scopes[route] = { _router: this };
      }
      this.silent = false;
    };
    constructor.prototype = {
      onHashChange: function(event){
        var hash = window.location.hash;
        if (!this.silent && this.exit.hasOwnProperty(this.current)) this.exit[this.current].call(this.scopes[hash]);
        if (!this.silent && this.enter.hasOwnProperty(hash)) this.enter[hash].call(this.scopes[hash]);
        this.current = hash;
        this.silent = false;
      }
    , navigate: function(route, silent){
        this.silent = !!silent;
        window.location.hash = route;
      }
    , listen: function(route, silent){
        window.addEventListener('hashchange', this.onHashChange.bind(this));
        this.onHashChange();
        // For now lets not add the ability to enter a route here
        // this.navigate((typeof route === "string") ? route : window.location.hash, silent);
        return this;
      }
    , stop: function(){
        window.removeEventListener('hashchange', this.onHashChange);
        return this;
      }
    };
    return constructor;
  })();
  if (define) define(function(){ return PaperBoy; });
  else window.PaperBoy = PaperBoy;
})();