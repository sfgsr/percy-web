import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  session: service(),
  tagName: 'a',
  attributeBindings: ['tabindex'],
  tabindex: 0,

  redirectToDefaultOrganization: null,

  classNames: ['Button', 'Button--primary', 'Button--onDark'],
  classNameBindings: ['classes'],

  click() {
    this.sendAction('redirectToDefaultOrganization');
  },

  keyDown(event) {
    // 13 = return key
    if (event.keyCode == 13) {
      this.click();
    }
  },
});
