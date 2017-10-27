import {computed} from '@ember/object';
import {not} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  object: null,
  enabled: false,
  classes: null,
  enabledText: 'Disable',
  disabledText: 'Enable',

  disabled: not('enabled'),
  tagName: 'button',
  classNames: ['ToggleButton', 'Button'],
  classNameBindings: ['enabled:Button--primary', 'classes'],

  text: computed('enabled', 'enabledText', 'disabledText', function() {
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
