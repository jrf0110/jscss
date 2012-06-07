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