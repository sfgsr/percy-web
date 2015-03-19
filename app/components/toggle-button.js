import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['Button', 'ToggleButton'],
  classNameBindings: ['enabled::Button--primary'],
  enabled: false,
  disabled: Ember.computed.not('enabled'),
  enabledText: 'Disable',
  disabledText: 'Enable',
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