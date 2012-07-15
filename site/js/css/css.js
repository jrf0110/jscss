define(function(require){
	var
		// 3rd Party Dependencies

		// App Dependencies
    utils   = require('utils')
  , globals = require('css/globals')
  , grid    = require('css/grid')
  , mixins  = require('css/mixins')

		// Module Variables
  , fonts     = globals.fonts
  , color    = globals.color
  , css = {
      "body": {
        "margin": "0"
      , "padding": "0"
      , "font-family": fonts.sansSerif
      , "color": color.white
      , "text-shadow": "0 1px 0 rgba(0, 0, 0, 0.5)"
      , "background": "url('images/body-bg-banner.png') repeat-x 0 40px"
                  + ", url('images/body-bg.jpg')"
      }
      // Headers
   ,  "h1, h2, h3": {
        "font-family": fonts.serif
      , "color": color.orange
      }

      // Container
    , ".app-container": {
        "position": "relative"
      , "width": "84%"
      , "min-width": "530px"
      , "margin": "0 auto"

        // Header
      , "> .app-header": {
          "position": "absolute"
        , "top": "42px"
        , "display": "-webkit-box"
        , "-webkit-box-orient": "horizontal"
        , "width": "100%"
        , "height": "195px"

        , "> .fold-left": {
            "width": "21px"
          , "height": "178px"
          , "background": "url('images/header-fold-left.png') no-repeat 0 0"
          }
        , "> .fold-right": {
            "width": "22px"
          , "height": "177px"
          , "background": "url('images/header-fold-right.png') no-repeat 0 0"
          }
        , "> .logo": {
            "width": "486px"
          , "height": "195px"
          , "background": "url('images/header-center.png') no-repeat 0 -3px"
          }
        , "> .repeatable": {
            "-webkit-box-flex": "1"
          , "background": "url('images/header-repeat-center.png') repeat-x 0 -37px"
          }
        }

        // Content
      , "> .app-content": {
          "height": "600px"
        , "margin": "0 22px 0 21px"
        , "padding": "212px " + globals.grid.gutterWidth + " 12px " + globals.grid.gutterWidth
        , "background": "url('images/content-bg.jpg')"
        , "box-shadow": "0 0 4px rgba(0,0,0, 0.44)"
        }
      }
    }
	;

	return utils.extend(css, grid);
});
