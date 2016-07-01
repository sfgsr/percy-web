import Ember from 'ember';

export default Ember.Component.extend({
  count: null,
  total: null,

  classes: null,
  widthPercentage: Ember.computed('count', 'total', function() {
    let value = Math.min(100, Math.max(1, (this.get('count') / this.get('total') * 100)));
    return Ember.String.htmlSafe(value.toString());
  }),

  classNames: [
    'MeterBar',
  ],
  classNameBindings: [
    'classes',
  ],
});
