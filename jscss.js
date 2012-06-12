var fs = require('fs');

var indent = function(level){
  var out = "";
  for (var i = 0; i < level; i++){
    out += "  ";
  }
  return out
};

var compile = function(hash, level){
  var spaces = "  ", out = "", level = level || 0;
  for (var key in hash){
    out += indent(level);
    out += key;
    if (typeof hash[key] === "object"){
      out += " {\n" + compile(hash[key], level + 1) + indent(level) + "}\n";
    }else{
      out += ": " + hash[key] + ";\n";
    }
  }
  return out;
};

module.exports = function(output){
  var stream = fs.createWriteStream(output);
  var files = Array.prototype.slice.call(arguments, 1);
  stream.once('open', function(){
    for (var i = 0, file; i < files.length; i++){
      file = require(files[i]);
      stream.write('/* ' + files[i] + '*/\n\n');
      stream.write(compile(file));
    }
  });
};