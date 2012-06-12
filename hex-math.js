var maxColor = 16777215
, colorToInt = function(hex){
    hex = hex.replace('#', '');
    // Change shorthand so we can do proper math
    if (hex.length == 3){
      var tmp = hex;
      hex = "";
      for (var i = 0; i < tmp.length; i++){
        hex += "" + tmp[i] + tmp[i];
      }
    }
    return ("0x" + hex - 0);
  }
, intToColor = function(int){
    int = int.toString(16);
    while (int.length < 6){
      int = "" + "0" + int;
    }
    return '#' + int;
  }
, colorIntClamp = function(int){
    if (int > maxColor) return maxColor;
    if (int < 0) return 0;
    return int;
  }
;


module.exports = {
  add: function(){
    var args = Array.prototype.slice.call(arguments, 0), total = colorToInt(args[0]);
    for (var i = 1; i < args.length; i++){
      total += colorToInt(args[i]);
    }
    return colorIntClamp(intToColor(total));
  }
, subtract: function(){
    var args = Array.prototype.slice.call(arguments, 0), total = colorToInt(args[0]);
    for (var i = 1; i < args.length; i++){
      total += colorToInt(args[i]);
    }
    return colorIntClamp(intToColor(total));
  }
, multiply: function(){
    var args = Array.prototype.slice.call(arguments, 0), total = colorToInt(args[0]);
    for (var i = 1; i < args.length; i++){
      total *= colorToInt(args[i]);
    }
    return colorIntClamp(intToColor(total));
  }
, divide: function(){
    var args = Array.prototype.slice.call(arguments, 0), total = colorToInt(args[0]);
    for (var i = 1; i < args.length; i++){
      total /= colorToInt(args[i]);
    }
    return colorIntClamp(intToColor(total));
  }
};