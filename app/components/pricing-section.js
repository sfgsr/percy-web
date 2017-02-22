import utils from 'percy-web/lib/utils';
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['PricingSection'],
  classNameBindings: ['classes'],

  showJumpToBilling: false,
  session: Ember.inject.service(),
  subscriptionData: Ember.inject.service(),
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
