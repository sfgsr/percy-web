import Ember from 'ember';

export default Ember.Component.extend({
  organization: null,
  classes: null,

  isSaving: null,
  isSaveSuccessful: null,

  subscriptionData: Ember.inject.service(),
  classNames: ['OrganizationsBillingSection'],
  classNameBindings: ['classes'],
  adminMode: Ember.inject.service(),
  showCancel: Ember.computed('organization.subscription.isCustomer', function() {
    let isCustomer = this.get('organization.subscription.isCustomer');
    return isCustomer && this.get('adminMode').get() == 'admin';
  }),
  actions: {
    changingSubscription(savingPromise) {
      this.set('isSaveSuccessful', null);
      this.set('isSaving', true);
      savingPromise.then(() => {
        this.set('isSaving', false);
        this.set('isSaveSuccessful', true);
      }, () => {
        this.set('isSaving', false);
        this.set('isSaveSuccessful', false);
      });
    },
    showSupport() {
      this.sendAction('showSupport');
    }
  },
});
