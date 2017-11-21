import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['PricingSection'],
  classNameBindings: ['classes'],

  showJumpToBilling: false,
  session: service(),
  subscriptionData: service(),
  actions: {
    jumpToBilling() {
      window.scrollTo(0, 0);
      this.set('showJumpToBilling', true);
    },
    hideModal() {
      this.set('showJumpToBilling', false);
    },
    startTrial() {
      this.sendAction('redirectToDefaultOrganization');
    },
    showSupport() {
      this.sendAction('showSupport');
    },
  },
});
