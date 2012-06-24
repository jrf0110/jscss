var fs = require('fs');

var indent = function(level){
  var out = "";
  for (var i = 0; i < level; i++){
    out += "  ";
  }
  return out
};


// This is O(2s + 2d)
// Where s is the number of selectors
// And d is the number of properties
// I wonder if I can make it O(s + d)
var compile = function(obj){
  var selectors = {},
  // Make a predictable object we can work with
   _buildSelectors = function(hash, selector){
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
  },
  // Take a flat css object and turn it into a string
  _compile = function(hash, level){
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
  };
  _buildSelectors(obj, "");
  // console.log(selectors);
  return _compile(selectors, 0);
};

module.exports = function(output){
  var stream = fs.createWriteStream(output);
  var files = Array.prototype.slice.call(arguments, 1);
  stream.once('open', function(){
    for (var i = 0, file; i < files.length; i++){
      file = require(files[i]);
      stream.write('/* ' + files[i] + ' */\n\n');
      stream.write(compile(file));
    }
  });
};