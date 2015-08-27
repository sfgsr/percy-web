import Ember from 'ember';
import Formatting from '../lib/formatting';

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
  return Formatting.formatCurrency(value, options.hash);
});
