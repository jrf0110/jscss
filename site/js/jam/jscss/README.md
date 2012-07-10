#Stop using Sass and Less - They suck.

Ok, they're great, but definitely lacking. They make a broken programming language out of an overhauled styling system. So let's use a real programming language: Javascript.

Here's a one-to-one with Less

##Variables

```javascript
var color = "#4d926f";
module.exports = {
  "#header": {
    color: color
  }
, "h2": {
    color: color
  }
};
```

###Compiled CSS

```css
#header {
  color: #4d926f;
}
h2 {
  color: #4d926f;
}
```

##Mixins

```javascript
var roundedCorners = function(radius){
  radius || (radius = "5px");
  return {
    "-webkit-border-radius": radius
  , "-moz-border-radius": radius
  , "border-radius": radius
  };
};

module.exports = {
  "#header": roundedCorners()
, "#footer": roundedCorners("10px")
};
```

###Compiled CSS

```css
#header {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
#footer {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}
```

##Nested Rules

```javascript
module.exports = {
  '#header': {
    "h1": {
      "font-size": "26px"
    , "font-weight": "bold"
    }
  , "p": {
      "font-size": "12px"
    , "a": {
        "text-decoration": "none"
      }
    , '> .poop': {
        'color': 'brown'
      }
    }
  }
};
```

###Compiled CSS

```css
#header h1 {
  font-size: 26px;
  font-weight: bold;
}
#header p {
  font-size: 12px;
}
#header p a {
  text-decoration: none;
}
#header p a:hover {
  border-width: 1px;
}
#header p > .poop {
  color: brown;
}
```

##Functions and Operators

Currently all I have is hex math

```javascript
module.exports = {
  '.jibber-jabber': {
    color: globals.baseColor
    // Pretty stupid but whatever
  , "background-color": hex.multiply(globals.baseColor, globals.accent, globals.backgroundColor)
  }
}
```

##In the Browser

```html
<!DOCTYPE HTML>
<html>
  <head>
    <script type="text/javascript" src="../lib/index.js"></script>
    <script type="text/javascript">
      // Mixin
      var roundedCorners = function(radius){
        radius || (radius = "5px");
        return {
          "-webkit-border-radius": radius
        , "-moz-border-radius": radius
        , "border-radius": radius
        };
      };
      // Just a quick and dirty merge object
      var mix = function(obj1, obj2){
        for (var key in obj2){
          obj1[key] = obj2[key];
        }
        return obj1;
      };
      // Css declarations
      var cssObj = {
        "body": {
          "background-color": "pink"
        }
      , '.testing': mix({
          "background-color": "#fff"
        , "padding": "22px"
        , "> .test": {
            "color": "blue"
          }
        }, roundedCorners("10px"))
      };
      // Embed the compiled jscss object
      jscss.embed(jscss.compile(cssObj));
    </script>
  </head>
  <body>
    <div class="testing">
      <span class="test">Just testing</span>
    </div>
  </body>
</html>
```

##Animations, Media Queries, and Other More-Nested Features

Same Story

```javascript
module.exports = {
  '.columns': {
    'display': 'table'
  , 'width': '100%'
  }
, '.columns > .column': {
    'width': '50%'
  , 'box-sizing': 'border-box'
  , 'margin-left': "20px"
  }
, '@-animation-keyframes spin': {
    '0%': {
      'transform': 'rotate(0deg)'
    }
  , '100%': {
      'transform': 'rotate(360deg)'
    }
  }
};
```

```css
/* ./layout.js*/

.columns {
  display: table;
  width: 100%;
}
.columns > .column {
  width: 50%;
  box-sizing: border-box;
  margin-left: 20px;
}
@-animation-keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

##Make a jscss Build File

It's just a javascript file you execute with node.js. I'll add in some nifty command-line tools later.

```javascript
var jscss = require('jscss')
  // Require your modules
, globals = require('./css/globals.js')
, layout = require('./css/layout.js')
, themes = require('./css/themes.js')
, main = require('./css/main.js')
;

// Compile your css
jscss(
  // First parameter defines your output file
  './css/main.css'
  // Subsequent parameters define modules to be compiled
, globals
, layout
, themes
, main
);

jscss(
  './css/main.css'
, './css/globals.js'
, './css/layout.js'
, './css/themes.js'
, './css/main.js'
);

// Or just pass in the paths
```

##Leverage NPM or JAM

Since this is all javascript, use a package manager. Organize your code into self-contained javascript modules. Easily include everything you'll need

##Install

I'm not really ready for this to be part of any build tools, so for now, it only works in the browser. The examples show some module.exports stuff, but really, you'll want to make it AMD or CommonJS-node compatible.

```
jam install jscss
```

That's all, folks!
