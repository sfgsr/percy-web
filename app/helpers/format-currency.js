import Ember from 'ember';
import Formatting from '../lib/formatting';

export default Ember.Helper.helper(function(value, options) {
  return Formatting.formatCurrency(value, options.hash);
});
