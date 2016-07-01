import Ember from 'ember';

export default Ember.Component.extend({
  object: null,
  enabled: false,
  classes: null,
  enabledText: 'Disable',
  disabledText: 'Enable',

  disabled: Ember.computed.not('enabled'),
  tagName: 'button',
  classNames: ['ToggleButton', 'Button'],
  classNameBindings: ['enabled:Button--primary', 'classes'],

  text: Ember.computed('enabled', 'enabledText', 'disabledText', function() {
    if (this.get('enabled')) {
      return this.get('enabledText');
    } else {
      return this.get('disabledText');
    }
  }),

  click() {
    this.sendAction('action', this.get('enabled'), this.get('object'));
  },
});