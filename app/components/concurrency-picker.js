import Ember from 'ember';

export default Ember.Component.extend({
  plan: null,
  isDisabled: false,

  tagName: 'select',
  options: null,
  optionsZeroIndexedLength: null,
  attributeBindings: ['isDisabled:disabled'],
  classNames: ['ConcurrencyPicker'],
  setupOptions: function() {
    var plan = this.get('plan');
    var options = [5, 10, 15, 25, 50, 75, 100];
    if (plan === 'free' || plan === 'basic') {
      options.unshift(2);
    }
    this.set('options', options);
    this.set('optionsZeroIndexedLength', options.length - 1);
  }.on('init'),
  input: function(e) {
    this._handleChange(e)
  },
  change: function(e) {
    // This is for IE, because it completely does not handle the events correctly.
    // http://www.impressivewebs.com/onchange-vs-oninput-for-range-sliders/
    this._handleChange(e)
  },
  _handleChange: function(e) {
    this.sendAction('changed', this.get('plan'), parseInt(e.target.value));
  },
});
