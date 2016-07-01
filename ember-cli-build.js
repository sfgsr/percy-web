var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      comments: false,
      includePolyfill: true,
    },
    'ember-cli-mocha': {
      useLintTree: false
    },
    sassOptions: {
      extension: 'sass',
    }
  });

  app.import('bower_components/accounting.js/accounting.js');
  app.import('bower_components/hint.css/hint.css');
  app.import('bower_components/highlightjs/styles/github.css');
  app.import('bower_components/highlightjs/highlight.pack.js');

  return app.toTree();
};
