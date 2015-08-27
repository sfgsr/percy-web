import Ember from 'ember';
import Formatting from '../lib/formatting';

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
  return Formatting.formatNumber(value, options.hash);
});
