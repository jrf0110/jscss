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

, '#header': {
    "h1": {
      "font-size": "26px"
    , "font-weight": "bold"
    }
  , "p": {
      "font-size": "12px"
    , "a": {
        "text-decoration": "none"
      // , "&:hover": { "border-width": "1px" }
      }
    , '> .poop': {
        'color': 'brown'
      }
    }
  , ".test": {
      "font-size": "1.2rem"
    }
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