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

I'll admit, I"m still working on this. It will be here soon :)

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
      , "&:hover": { "border-width": "1px" }
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

Ok, granted you can do this stuff yourself by parsing out the integers from string values, I plan on making it really easy in the future :)

##Client-Side Usage

Yeah, I made this for the client-side originally. It will work just fine except it relies on commonJS modules. So get a module loader and you're set. I'll experiment with various existing loaders.

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

##Leverage NPM

Since these are node.js modules you're building for css, you can use npm to manage your css.


##Note

I'm not ready for people to really start using this yet. It works, but it's not great. So, it's not in the npm registry just yet. But when it is, install it with:

```
npm install jscss
```

That's all, folks!
