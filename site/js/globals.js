define(function(require){
  var
    // 3rd Party Dependencies

    // App Dependencies

    // Module Variables
    globals = {}
  ;

  // Font Types
  var fonts = globals.fonts = {};
  fonts.serif      = '"adelle", Georgia, serif';
  fonts.sansSerif  = '"adelle-sans", sans-serif';
  fonts.mono       = 'Menlo, Monaco, Consolas, "Courier New", monospace';

  // Colors
  var color = globals.color = {};
  color.white     = "#f1f1f1";
  color.black     = "#000000";
  color.orange    = "#ff5e09";
  color.yellow    = "#ffc209";
  color.green     = "#70c94d";
  color.blue      = "#50c9ff";
  color.pink      = "#f876f0";
  color.red       = "#6c110a";

  // Grid
  var grid = globals.grid = {};
  grid.columns       = 12;
  grid.columnsWidth  = "60px";
  grid.gutterWidth   = "20px";

  return globals;
});
