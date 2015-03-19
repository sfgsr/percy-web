import Ember from 'ember';

export default Ember.Component.extend({
  enabled: false,
  classes: null,
  enabledText: 'Disable',
  disabledText: 'Enable',

  disabled: Ember.computed.not('enabled'),
  tagName: 'button',
  classNames: ['Button', 'ToggleButton'],
  classNameBindings: ['enabled:Button--primary', 'classes'],

  text: function() {
    if (this.get('enabled')) {
      return this.get('enabledText');
    } else {
      return this.get('disabledText');
    }
  }.property('enabled', 'enabledText', 'disabledText'),

  click: function() {
    this.set('enabled', !this.get('enabled'));
    this.sendAction();
  },
});