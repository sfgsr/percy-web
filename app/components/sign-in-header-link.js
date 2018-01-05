import Component from '@ember/component';
import TargetApplicationActionsMixin from 'percy-web/mixins/target-application-actions';

export default Component.extend(TargetApplicationActionsMixin, {
  tagName: 'a',
  href: '#',
  attributeBindings: ['tabindex', 'href'],
  tabindex: 0,

  click() {
    this.send('showLoginModal');
  },

  keyDown(event) {
    // 13 = return key
    if (event.keyCode == 13) {
      this.click();
    }
  },
});
