var fs = require('fs')
var compile = function(hash, indent){
  var spaces = "  ", out = "", indent = indent || 0;
  for (var key in hash){
    out += "\n";
    for (var i = 0; i < indent; i++){
      out += "  ";
    }
    out += key;
    if (typeof hash[key] === "object"){
      out += " {" + compile(hash[key], indent + 1) + "\n}\n";
    }else{
      out += ": " + hash[key] + ";";
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