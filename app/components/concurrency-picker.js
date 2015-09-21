import Ember from 'ember';

export default Ember.Component.extend({
  plan: null,

  options: null,
  optionsZeroIndexedLength: null,
  classNames: ['ConcurrencyPicker'],
  setupOptions: function() {
    var plan = this.get('plan');
    var options = [5, 10, 15, 25, 50];
    if (plan === 'free') {
      options = [2];
    } else if (plan === 'basic') {
      options = [2, 5, 10];
    }
    this.set('options', options);
    this.set('optionsZeroIndexedLength', options.length - 1);
  }.on('init'),
  setupSlider: function() {
    var self = this;
    var pipsOptions = {
      first: 'pip',
      last: 'pip',
      rest: 'pip',
      labels: false,
    };
    this.$().slider({
      max: this.get('options').length - 1,
      value: 0,
      change: function(event, ui) { self._handleChange(self.get('options')[ui.value]); },
      slide: function(event, ui) { self._handleChange(self.get('options')[ui.value]); },
    }).slider('pips', pipsOptions);
  }.on('didInsertElement'),
  _handleChange: function(value) {
    this.sendAction('changed', this.get('plan'), parseInt(value));
  },
});
