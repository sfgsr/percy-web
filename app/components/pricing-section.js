import {inject as service} from '@ember/service';
import Component from '@ember/component';
import utils from 'percy-web/lib/utils';

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
    login() {
      utils.redirectToLogin({redirectTo: '/organizations/new'});
    },
    showSupport() {
      this.sendAction('showSupport');
    },
  },
});
