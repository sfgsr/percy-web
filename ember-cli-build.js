/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      comments: false,
    },
    'ember-cli-babel': {
      includePolyfill: true,
    },
    'ember-cli-mocha': {
      useLintTree: false,
    },
    sassOptions: {
      extension: 'scss',
      sourceMapEmbed: true,
    },
    autoprefixer: {
      browsers: ['last 2 versions'],
      sourcemap: true,
    },
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
      prepend: '/static/',
    },
    svg: {
      paths: ['public/images/icons', 'public/images/logos'],
      optimize: false,
    },
    sourcemaps: {
      enabled: true,
    },
  });

  app.import('bower_components/accounting.js/accounting.js');
  app.import('bower_components/highlightjs/styles/github.css');
  app.import('bower_components/highlightjs/highlight.pack.js');
  app.import('bower_components/raven-js/dist/raven.js');
  app.import('bower_components/raven-js/dist/plugins/ember.js');
  app.import('bower_components/sinon-chai/lib/sinon-chai.js', {type: 'test'});
  app.import('bower_components/seedrandom/seedrandom.js');

  var extraAssets;
  if (app.env === 'development' || app.env === 'test') {
    extraAssets = new Funnel('tests/public/images/test', {
      destDir: 'images/test',
    });
  }
  return app.toTree(extraAssets);
};
