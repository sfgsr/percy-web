/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.
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

module.exports = app.toTree();
