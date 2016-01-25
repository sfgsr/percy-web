import Ember from 'ember';

export default Ember.Component.extend({
  count: null,
  total: null,

  classes: null,
  widthPercentage: function() {
    let value = Math.min(100, Math.max(1, (this.get('count') / this.get('total') * 100)));
    return Ember.String.htmlSafe(value.toString());
  }.property('count', 'total'),

  classNames: [
    'MeterBar',
  ],
  classNameBindings: [
    'classes',
  ],
});
