define(function(require){
  var
    // 3rd Party Dependencies

    // App Dependencies
    utils   = require('utils')
  , globals = require('globals')
  , mixins  = require('mixins')

    // Module Variables
    grid = {
      ".grid": {}
    , ".grid .row": {}
    }
  ;

  // build grid components
  for (var i = 1, len = globals.grid.columns; i <= len; i++){
    // Build the spans
    grid[".grid .row"]["> .span" + i] = mixins.span(i, len, globals.grid.gutterWidth);
    // Offsets
    grid[".grid .row"]["> .offset" + i] = mixins.offset(i, len, globals.grid.gutterWidth);
  }

  return grid;
});
