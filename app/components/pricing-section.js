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
      // Send action directly up to application controller, so we don't have to delegate every
      // time in the template.
      let applicationController = Ember.getOwner(this).lookup('controller:application');
      applicationController.send('redirectToLogin');
    }
  },
});
