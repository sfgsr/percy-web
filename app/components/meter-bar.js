import Ember from 'ember';

export default Ember.Component.extend({
  count: null,
  total: null,

  classes: null,
  widthPercentage: function() {
    return Math.min(100, Math.max(1, (this.get('count') / this.get('total') * 100)));
  }.property('count', 'total'),

  classNames: [
    'MeterBar',
  ],
  classNameBindings: [
    'classes',
  ],
});
