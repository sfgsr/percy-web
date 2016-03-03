var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      comments: false,
      includePolyfill: true,
    }
  });

  app.import('bower_components/accounting.js/accounting.js');
  app.import('bower_components/hint.css/hint.css');
  app.import('vendor/highlight/styles/github.css');
  app.import('vendor/highlight/highlight.pack.js');

  // Just the parts of jQuery UI we want for the slider.
  app.import('bower_components/jquery-ui/ui/core.js');
  app.import('bower_components/jquery-ui/ui/widget.js');
  app.import('bower_components/jquery-ui/ui/mouse.js');
  app.import('bower_components/jquery-ui/ui/slider.js');
  app.import('bower_components/jquery-ui/themes/base/core.css');
  app.import('bower_components/jquery-ui/themes/base/slider.css');
  app.import('bower_components/jquery-ui-slider-pips/dist/jquery-ui-slider-pips.js');
  app.import('bower_components/jquery-ui-slider-pips/dist/jquery-ui-slider-pips.css');

  return app.toTree();
};
