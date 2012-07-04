;(function(){
  var
    id = 0
  , indent = function(level){
      var out = "";
      for (var i = 0; i < level; i++){
        out += "  ";
      }
      return out
    }
  , jscss = {
      compile: function(obj){
        var
          selectors = {}
          // Build nested rules into single rules
        , _buildSelectors = function(hash, selector){
            var curr, type, selector, key;
            for (key in hash){
              type = typeof (curr = hash[key]);
              if (type == "string"){
                if (!selectors[selector]) selectors[selector] = {};
                selectors[selector][key] = curr;
              }else if (type == "object"){
                // Media query or animation or something
                if (key[0] == "@"){
                  selectors[key] = curr;
                }else{
                  _buildSelectors(curr, (selector ? (selector + " ") : "") + key);
                }
              }
            }
          }
          // Take a flat css object and turn it into a string
        , _compile = function(hash, level){
            var spaces = "  ", out = "", level = level || 0, curr;
            for (var key in hash){
              curr = hash[key];
              out += indent(level) + key;
              if (typeof curr == "object"){
                out += " {\n" + _compile(curr, level + 1) + indent(level) + "}\n";
              }else{
                out += ": " + curr + ";\n";
              }
            }
            return out;
          }
        ;
        _buildSelectors(obj, "");
        return _compile(selectors, 0);
      }
      // Embeds a
    , embed: function(styles, styleId){
        styleId || (styleId = "jscss-" + (id++));
        var el = document.createElement('style');
        el.type = "text/css";
        el.rel = "stylesheet";
        el.id = styleId;
        el.innerHTML = "\n" + styles;
        document.head.appendChild(el);
      }
    }
  ;
  if (typeof define !== "undefined") {
    define('jscss', function(){ return jscss; });
  }else if (typeof module !== "undefined" && module.exports){
    module.exports = jscss;
  }else{
    window.jscss = jscss;
  }
})();